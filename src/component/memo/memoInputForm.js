import React, { useState } from 'react';
import axios from 'axios';

function MemoInputForm({ addMemo }) {
    const [memoContent, setMemoContent] = useState('');
    
    const regUserId = "hw";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memoContent.trim()) {
      addMemo({memoContent, regUserId });
      setMemoContent(''); // 입력 후 텍스트 초기화
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={memoContent}
        onChange={(e) => setMemoContent(e.target.value)}
        placeholder="장보기 항목을 추가하세요."
        className="border p-2 w-full"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white">추가</button>
    </form>
  );
};

export default MemoInputForm;
