import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemoHeader from './memoHeader';
import MemoInputForm from './memoInputForm';
import MemoEmptyList from './memoEmptyList';
import MemoPurchasedList from './memoPurchasedList';

const MemoContainer = () => {
  const [memos, setMemos] = useState([]);   // 장보기 목록
  const [purchasedMemos, setPurchasedMemos] = useState([]); // 구매완료 목록

  // 데이터 초기화(API에서 목록 불러오기)
  useEffect(() => {
    fetchMemos();
    fetchPurchasedMemos();
  }, []);

  const fetchMemos = async (newMemo) => {
    try {
        const response = await axios.post('http://localhost:8000/api/memo-service/selectEmptyList', newMemo); // 장보기 목록 조회
        setMemos(response.data);
    } catch(error) {
        console.error('Failed to fetch memos:', error);
    }
  }

  const fetchPurchasedMemos = async (newMemo) => {
    try {
      const response = await axios.post('http://localhost:8000/api/memo-service/selectPurchasedList', newMemo); // 서버에서 구매완료 목록을 가져옵니다.
      setPurchasedMemos(response.data);
    } catch (error) {
      console.error('Failed to fetch purchased memos:', error);
    }
  };
  // 메모 등록
  const addMemo = async (newMemo) => {
    try {
      const response = await axios.post('http://localhost:8000/api/memo-service/saveMemo', newMemo); // 새 항목을 추가
      fetchMemos({status: 'N', regUserId: 'hw'}); // 새 항목을 목록에 추가
    } catch (error) {
      console.error('Failed to add Memo:', error);
    }
  };

  // 메모 이동 (체크박스 체크 시 장보기 -> 완료 / 완료 -> 장보기기)
  const moveToMemo = async (memoUpdate) => {
    try {
        await axios.post(`http://localhost:8000/api/memo-service//moveToMemo`, memoUpdate); // 서버에서 항목 이동 처리
        fetchMemos({status: 'N', regUserId: 'hw'}); // 장보기 목록 조회
//        fetchPurchasedMemos({status: 'P', regUserId: 'hw'}) // 구매완료 목록 조회
    } catch (error) {
      console.error('Failed to move to purchased:', error);
    }
  };


  const deleteMemo = async (memoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/memo-service/deleteMemo/${memoId}`); // 서버에서 항목 삭제
      setMemos(memos.filter(n => n.id !== memoId)); // 로컬 목록에서 제거
      setPurchasedMemos(memos.filter(n => n.id !== memoId)); // 로컬 목록에서 제거
    } catch (error) {
      console.error('Failed to delete Memo:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 max-w-3xl mx-auto rounded-lg shadow-md">
      <MemoHeader />
      <MemoInputForm addMemo={addMemo} />
      <MemoEmptyList
        memos={memos}
        moveToMemo={moveToMemo}
        deleteMemo={deleteMemo}
      />
      <MemoPurchasedList
        purchasedMemos={purchasedMemos}
        moveToMemo={moveToMemo}
        deleteMemo={deleteMemo}
      />
    </div>
  );
};


  
  export default MemoContainer;
