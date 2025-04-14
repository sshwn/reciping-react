import React from 'react';
import './memo.css';
import MemoEmptyList from './memoEmptyList';


const MemoPurchasedList = ({
  purchasedMemos,
  moveToMemo,
  deleteMemo,
}) => {
  return (
      <div>
        <h2 className="text-lg font-semibold mb-4">구매완료 목록 ({purchasedMemos.length})</h2>
        {purchasedMemos.map((memo, index) => (
          <div
            key={memo.memoId}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-md mb-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={memo.checked}
                onChange={() => moveToMemo({memoId: memo.memoId, status: 'N'})}
                className="form-checkbox h-5 w-5 rounded-full text-green-500"
              />
              <p
                onClick={() => moveToMemo({memoId: memo.memoId, status: 'N'})}
                className="cursor-pointer text-gray-500 line-through"
              >
                {memo.memoContent}
              </p>
            </div>
            <button
              onClick={() => deleteMemo(memo.memoId, true)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
  );
};
  
  export default MemoPurchasedList;