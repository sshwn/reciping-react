const RecipeCategory = () => {
    return (
        <div className="grid grid-cols-4 gap-3">
            <div>
            <select className="w-full p-2 mt-2 border rounded-lg">
                <option value="option1">종류별</option>
                <option value="option2">옵션 2</option>
            </select>
            </div>
            <div>
            <select className="w-full p-2 mt-2 border rounded-lg">
                <option value="option1">상황별</option>
                <option value="option2">옵션 2</option>
            </select>
            </div>
            <div>
            <select className="w-full p-2 mt-2 border rounded-lg">
                <option value="option1">방법별</option>
                <option value="option2">옵션 2</option>
            </select>
            </div>
            <div>
            <select className="w-full p-2 mt-2 border rounded-lg">
                <option value="option1">재료별</option>
                <option value="option2">옵션 2</option>
            </select>
            </div>
        </div>
    );
  };
  
  export default RecipeCategory;
  