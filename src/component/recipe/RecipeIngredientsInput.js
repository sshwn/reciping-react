import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

const RecipeIngredientsInput = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "", note: "" },
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "", note: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2">재료 정보</h2>
      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="예) 돼지고기"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
              className="border rounded-md px-3 py-2 w-1/4"
            />
            <input
              type="text"
              placeholder="10(수량)"
              value={ingredient.quantity}
              onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
              className="border rounded-md px-3 py-2 w-1/6"
            />
            <input
              type="text"
              placeholder="예) g,ml(단위)"
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
              className="border rounded-md px-3 py-2 w-1/6"
            />
            <input
              type="text"
              placeholder="예) (비고)"
              value={ingredient.note}
              onChange={(e) => updateIngredient(index, "note", e.target.value)}
              className="border rounded-md px-3 py-2 w-1/4"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 hover:text-red-700"
            >
              <MinusCircle size={20} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addIngredient}
        className="mt-4 flex items-center text-green-500 hover:text-green-700"
      >
        <PlusCircle size={20} className="mr-1" /> 추가
      </button>
    </div>
  );
};

export default RecipeIngredientsInput;