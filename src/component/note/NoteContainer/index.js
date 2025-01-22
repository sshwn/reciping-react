import React, { useState } from 'react';
import NoteHeader from '../NoteHeader';
import NoteInputForm from '../NoteInputForm';
import NoteEmptyList from '../NoteEmptyList';
import NotePurchasedList from '../NotePurchasedList';

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [purchasedNotes, setPurchasedNotes] = useState([]);

  const addNote = (text) => {
    const newNote = { text, checked: false };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  const deletePurchased = (index) => {
    setPurchasedNotes((prevNotes) =>
      prevNotes.filter((_, i) => i !== index)
    );
  };

  const moveToPurchased = (index, checked = true) => {
    setPurchasedNotes((prev) => [
      ...prev,
      { ...notes[index], checked: checked }, // checked 상태 추가
    ]);
    deleteNote(index);
  };

  const moveToEmpty = (index) => {
    setNotes((prev) => [...prev, { ...purchasedNotes[index], checked: false }]);
    deletePurchased(index);
  };

  return (
    <div className="bg-gray-100 p-6 max-w-3xl mx-auto rounded-lg shadow-md">
      <NoteHeader />
      <NoteInputForm addNote={addNote} />
      <NoteEmptyList
        notes={notes}
        moveToPurchased={moveToPurchased}
        deleteNote={deleteNote}
      />
      <NotePurchasedList
        purchasedNotes={purchasedNotes}
        moveToEmpty={moveToEmpty}
        deletePurchased={deletePurchased}
      />
    </div>
  );
};


  
  export default NoteContainer;
