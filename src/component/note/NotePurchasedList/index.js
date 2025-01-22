import React from 'react';
import './index.css';
import NoteEmptyList from '../NoteEmptyList';


const NotePurchasedList = ({
  purchasedNotes,
  moveToEmpty,
  deletePurchased,
}) => {
  return (
      <div>
        <h2 className="text-lg font-semibold mb-4">구매완료 목록 ({purchasedNotes.length})</h2>
        {purchasedNotes.map((note, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-md mb-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={note.checked}
                onChange={() => moveToEmpty(index)}
                className="form-checkbox h-5 w-5 rounded-full text-green-500"
              />
              <p
                onClick={() => moveToEmpty(index)}
                className="cursor-pointer text-gray-500 line-through"
              >
                {note.text}
              </p>
            </div>
            <button
              onClick={() => deletePurchased(index, true)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
  );
};
  
  export default NotePurchasedList;