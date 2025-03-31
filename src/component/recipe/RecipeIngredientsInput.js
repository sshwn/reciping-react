import React, { useState } from 'react';

const RecipeIngredientsInput = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "", note: "" }
  ]);

  const handleIngredientChange = (index, e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][e.target.name] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "", note: "" }]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="mt-6">
      <label className="block text-lg font-semibold mb-2">재료</label>
      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border-b border-gray-300 pb-4 hover:border-blue-300 relative"
            onMouseEnter={() => document.getElementById(`delete-btn-${index}`).style.display = 'block'}
            onMouseLeave={() => document.getElementById(`delete-btn-${index}`).style.display = 'none'}
          >
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              className="w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="재료명"
            />
            <input
              type="text"
              name="quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, e)}
              className="w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="수량"
            />
            <input
              type="text"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, e)}
              className="w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="단위"
            />
            <input
              type="text"
              name="note"
              value={ingredient.note}
              onChange={(e) => handleIngredientChange(index, e)}
              className="w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="비고"
            />
            {/* 삭제 버튼 */}
            <button
              id={`delete-btn-${index}`}
              onClick={() => removeIngredient(index)}
              className="hidden absolute right-0 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addIngredient}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        재료 추가
      </button>
    </div>
  );
};

export default RecipeIngredientsInput;
