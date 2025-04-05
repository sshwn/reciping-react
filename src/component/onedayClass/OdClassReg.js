import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import styled from "@emotion/styled";
import { X } from 'lucide-react';
import axios from "axios";
import DaumPostCode from 'react-daum-postcode';

const ClassCreationPage = () => {
  const [title, setTitle] = useState('');
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [timeInput, setTimeInput] = useState('');
  const [startTimes, setStartTimes] = useState([]);
  const [minParticipants, setMinParticipants] = useState(1);
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [detailLocation, setDetailLocation] = useState('');
  const [editorContent, setEditorContent] = useState('');

  // 시작 시간 추가
  const addTime = () => {
    if (timeInput && !startTimes.includes(timeInput)) {
        setStartTimes([...startTimes, timeInput]);
        setTimeInput('');
    }
  }; 

  // 시작 시간 삭제
  const removeTime = (time) => {
    setStartTimes(startTimes.filter(t => t !== time));
  };

  // 시간 선택을 10분 단위로 표시
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  // 다음 주소 api 관련
  const [openPostcode, setOpenPostcode] = useState(false);
  const [detailLocationVisible, setDetailLocationVisible] = useState(false); // 상세주소 표시 여부
  const handlePostcode = {
    clickButton: () => {
      setOpenPostcode(current => !current);
    }
  }

  // 작성완료 버튼 클릭 시
  const handleSubmit = async() => {
    // 필수값 체크
    if(title === ''){
      alert("제목을 입력해 주세요.");
      return;
    }

    if(durationHour === '' || durationMinute === ''){
      alert("소요시간을 선택해 주세요.");
      return;
    }

    if(startTimes.length === 0){
      alert("클래스 시작시간을 하나 이상 선택해 주세요.");
      return;
    }

    if(price === ''){
      alert("금액을 입력해 주세요.");
      return;
    }

    if(location === ''){
      alert("위치를 입력해 주세요.");
      return;
    }

    const regUserId = '홍길동';
    const photoUrl = 'https://static.onoffmix.com/afv2/thumbnail/2020/06/25/54c498755bd33b9508ca8102b91bc3fe.png';
    const classData = JSON.stringify({
      title,
      minParticipants: minParticipants,
      maxParticipants: maxParticipants,
      requiredTime: durationHour * 60 + durationMinute,
      location,
      detailLocation,
      price,
      content: editorContent,
      photoUrl,
      regUserId,
      startTimes : startTimes.map(time => ({ startTime: time })),
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/ODClass/saveODClass`, classData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('클래스 등록 성공:', response.data);
    } catch (error) {
      console.error('클래스 등록 실패:', error);
    }
  };

  return (
    <Container className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-gray-900">클래스 등록하기</h1>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-gray-700">클래스 제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="mt-2 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">클래스 소요시간</label>
          <div className="flex items-center gap-4 mt-2">
            <select value={durationHour} onChange={(e) => setDurationHour(parseInt(e.target.value))} className="w-1/3 p-2 border-2 border-gray-300 rounded-md">
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i}>{i}시간</option>
              ))}
            </select>
            <select value={durationMinute} onChange={(e) => setDurationMinute(parseInt(e.target.value))} className="w-1/3 p-2 border-2 border-gray-300 rounded-md">
              {[0, 10, 20, 30, 40, 50].map((m) => (
                <option key={m} value={m}>{m}분</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">시작시간</label>
          <div className="flex items-center gap-4 mt-2">
            <select
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="w-1/3 p-2 border-2 border-gray-300 rounded-md"
            >
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
            <button onClick={addTime} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">추가</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {startTimes.map((time, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full">
                <span>{time}</span>
                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => removeTime(time)}
                >
                  <X size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">참여 가능 인원</label>
          <div className="flex items-center gap-2">
            <span>최소</span>
            <input
              type="number"
              min="1"
              value={minParticipants}
              onChange={(e) => setMinParticipants(parseInt(e.target.value))}
              className="flex-1 min-w-0 p-2 border-2 border-gray-300 rounded-md text-center"
            />
            <span>명 ~ 최대</span>
            <input
              type="number"
              min={minParticipants}
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
              className="flex-1 min-w-0 p-2 border-2 border-gray-300 rounded-md text-center"
            />
            <span>명</span>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">금액</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="금액을 입력해 주세요"
            className="mt-2 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">위치</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={location}
              readOnly
              placeholder="주소를 검색해 주세요."
              className="flex-1 p-2 rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none" 
            />
            <button
              type="button"
              onClick={handlePostcode.clickButton}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition whitespace-nowrap"
            >
              주소검색
            </button>
          </div>

          {/* 주소 검색 창 (Daum Postcode) */}
          {openPostcode && (
            <div className="mt-4 border rounded-md overflow-hidden shadow-lg">
              <DaumPostCode
                onComplete={(data) => {
                  setLocation(data.address);
                  setDetailLocation(''); // 주소 변경될 떄마다 상세주소 초기화
                  setOpenPostcode(false);
                  setDetailLocationVisible(true);
                }}
                autoClose
                style={{ width: '100%', height: '400px' }}
              />
            </div>
          )}

          {/* 상세주소 입력창 - 조건부 렌더링 */}
          {detailLocationVisible && (
            <input
              type="text"
              value={detailLocation}
              onChange={(e) => setDetailLocation(e.target.value)}
              placeholder="상세주소를 입력해 주세요"
              className="mt-2 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">상세 설명</label>
          <div className="mt-2">
            <SunEditor
              setOptions={{
                minHeight: 400,
                height: 400,
                buttonList: [
                  ['undo', 'redo', 'bold', 'italic', 'underline', 'link', 'image'],
                  ['align', 'list', 'indent', 'outdent'],
                ],
              }}
              value={editorContent}
              onChange={(content) => setEditorContent(content)} 
              style={{ overflowY: 'auto' }}
            />
          </div>
        </div>

        <div className="text-center py-4">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-4 rounded-lg w-full hover:bg-blue-600">작성완료</button>
        </div>
      </div>
    </Container>
  );
};

export default ClassCreationPage;

const Container = styled.div`
  background-color: #f9fafb;
  padding: 40px;
  border-radius: 12px;
`;
