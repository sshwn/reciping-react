import './index.css';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteContainer from './component/note/NoteContainer';
import OdClassMainContainer from './component/onedayClass/OdClassMainContainer';
import OdClassDetailView from './component/onedayClass/OdClassDetailView';
import OdClassResConfirm from './component/onedayClass/OdClassResConfirm';
import OdClassResSuccess from './component/onedayClass/OdClassResSuccess';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<NoteContainer />} />
        <Route path="/onedayClassMain" element={<OdClassMainContainer />} />
        <Route path="/onedayClass/:id" element={<OdClassDetailView />} />
        <Route path="/confirmation" element={<OdClassResConfirm />} />
        <Route path="/resSuccess" element={<OdClassResSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
