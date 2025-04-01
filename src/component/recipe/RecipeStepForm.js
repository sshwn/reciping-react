import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

const RecipeStepForm = () => {
  const [steps, setSteps] = useState([
    { stepText: "", image: null }
  ]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newSteps = [...steps];
      newSteps[index].image = URL.createObjectURL(file); // 이미지 URL 생성
      setSteps(newSteps);
    }
  };

  const handleStepTextChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index].stepText = e.target.value;
    setSteps(newSteps);
  };

  const addNewStep = () => {
    setSteps([...steps, { stepText: "", image: null }]);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2">요리 순서</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            {/* Step number with green text */}
            <div className="flex items-center justify-center w-[40px] h-[160px]">
              <span className="text-lg font-semibold text-green-500">Step {index + 1}</span>
            </div>

            {/* Step content container */}
            <div className="flex space-x-4 w-full">
              {/* Textarea for recipe step */}
              <textarea
                value={step.stepText}
                onChange={(e) => handleStepTextChange(e, index)}
                placeholder="요리 순서를 입력하세요"
                className="border rounded-md px-3 py-2 h-[160px] resize-none w-full"
                rows={4} // 고정된 세로 길이
              />

              {/* Image upload button inside the 160x160 box */}
              <div className="relative w-[160px] h-[160px] border rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {/* If an image exists, display it within the 160x160 box */}
                {step.image && (
                  <img
                    src={step.image}
                    alt="첨부된 이미지"
                    className="w-full h-full object-cover rounded-md  "
                  />
                )}

                {/* + button in the center of the image box */}
                {!step.image && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500">
                    <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                      <PlusCircle size={24} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Remove step button with hover effect */}
            <div className="flex justify-center items-center w-[40px] h-[40px] ml-2">
              <button
                onClick={() => removeStep(index)}
                className="text-red-500 hover:text-red-700 opacity-0 hover:opacity-100 transition-opacity"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new step button */}
      <button
        onClick={addNewStep}
        className="mt-4 flex items-center text-green-500 hover:text-green-700"
      >
        <PlusCircle size={20} className="mr-1" /> 새로운 요리 순서 추가
      </button>
    </div>
  );
};

export default RecipeStepForm;
