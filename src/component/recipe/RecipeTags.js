const RecipeTags = () => {
    return (
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">태그 입력</h3>
        <input type="text" placeholder="주재료, 목적, 효능 등을 입력하세요." className="w-full border rounded p-2" />
      </div>
    );
  };
  
  export default RecipeTags;
  