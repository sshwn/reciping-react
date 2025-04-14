import './index.css';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemoContainer from './component/memo/memoContainer';
import OdClassMainContainer from './component/onedayClass/OdClassMainContainer';
import OdClassDetailView from './component/onedayClass/OdClassDetailView';
import OdClassResConfirm from './component/onedayClass/OdClassResConfirm';
import OdClassResSuccess from './component/onedayClass/OdClassResSuccess';
import OdClassReg from './component/onedayClass/OdClassReg';
import OdClassMyRes from './component/onedayClass/OdClassMyRes';
import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import FindIdPwd from "./component/user/FindIdPwd";
import RecipeForm from './component/recipe/form/RecipeForm';
import RecipePreview from './component/recipe/form/RecipePreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/memo" element={<MemoContainer />} />
        <Route path="/onedayClassMain" element={<OdClassMainContainer />} />
        <Route path="/onedayClass/:id" element={<OdClassDetailView />} />
        <Route path="/confirmation" element={<OdClassResConfirm />} />
        <Route path="/resSuccess" element={<OdClassResSuccess />} />
        <Route path='/regClass' element={<OdClassReg />} />
        <Route path='/myRes' element={<OdClassMyRes />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-account" element={<FindIdPwd />} />
        {/* 레시피 관련 경로 추가 */}
        <Route path="/recipe/recipeForm" element={<RecipeForm />} />
        <Route path="/recipe/recipePreview" element={<RecipePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
