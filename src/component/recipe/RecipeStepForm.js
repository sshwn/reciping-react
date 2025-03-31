import { useState } from "react";

const RecipeStepForm = () => {
  const [steps, setSteps] = useState([""]);

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">요리 순서</h3>
      {steps.map((step, index) => (
        <div key={index} className="mb-2">
          <textarea placeholder={`Step ${index + 1}`} className="w-full border rounded p-2" />
        </div>
      ))}
      <button onClick={addStep} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg">
        순서 추가
      </button>
    </div>
  );
};

export default RecipeStepForm;
