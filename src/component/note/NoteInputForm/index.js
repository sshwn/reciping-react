import React, { useState } from 'react';

const NoteInputForm = ({ addNote }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note) {
      addNote(note);
      setNote('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <div className="flex justify-center items-center gap-4 mb-6">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 border-2 border-green-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="재료 또는 상품명을 입력하세요"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
      >
        추가
      </button>
      </div>
    </form>
  );
};
  
export default NoteInputForm;