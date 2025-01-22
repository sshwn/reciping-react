import React from 'react';

const NoteEmptyList = ({ notes, moveToPurchased, deleteNote }) => {
  return (
    <div className="mb-8">
    <h2 className="text-lg font-semibold mb-4">장보기 목록 ({notes.length})</h2>
    {notes.length === 0 ? (
      <div className="text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M9 7h6m2 4H7m6 4H9m2 2H5m2-2h6"
          />
        </svg>
        <p className="mt-4">모든 재료를 구매 완료했어요!</p>
      </div>
    ) : (
      notes.map((note, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white p-4 rounded-md shadow-md mb-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => moveToPurchased(index)}
              className="form-checkbox h-5 w-5 rounded-full text-green-500"
            />
            <p
              onClick={() => moveToPurchased(index)}
              className="cursor-pointer text-gray-800"
            >
              {note.text}
            </p>
          </div>
          <button
            onClick={() => deleteNote(index, false)}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      ))
    )}
  </div>
  );
};

export default NoteEmptyList;