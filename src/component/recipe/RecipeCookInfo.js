const RecipeCookInfo = () => {
    return (
      <div className="mb-6 grid grid-cols-3 gap-6">
        <div>
          <select className="w-full p-3 mt-2 border rounded-lg">
            <option value="1">인원</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 mt-2 border rounded-lg">
            <option value="30">시간</option>
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 mt-2 border rounded-lg">
            <option value="easy">난이도</option>
            <option value="medium">중간</option>
            <option value="hard">어려움</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default RecipeCookInfo;
  