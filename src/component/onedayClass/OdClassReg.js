import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import styled from "@emotion/styled";
import { X } from 'lucide-react';
import axios from "axios";

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
  const [editorContent, setEditorContent] = useState('');

  const addTime = () => {
    if (timeInput && !startTimes.includes(timeInput)) {
        setStartTimes([...startTimes, timeInput]);
        setTimeInput('');
    }
  }; 

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

  const handleSubmit = async() => {
    const regUserId = '홍길동';
    const photoUrl = 'https://static.onoffmix.com/afv2/thumbnail/2020/06/25/54c498755bd33b9508ca8102b91bc3fe.png';
    const classData = JSON.stringify({
      title,
      totalParticipants: maxParticipants,
      requiredTime: durationHour * 60 + durationMinute,
      location,
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
    <Container className="max-w-3xl mx-auto">
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">클래스 등록하기</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="p-2 rounded w-full border-2 border-green rounded-md px-4 py-1"
      />

      <div className="mb-4">
        <label>클래스 소요시간</label>
        <br/>
        <select value={durationHour} onChange={(e) => setDurationHour(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i}>{i}시간</option>
          ))}
        </select>
        <select value={durationMinute} onChange={(e) => setDurationMinute(parseInt(e.target.value))}>
          {[0, 10, 20, 30, 40, 50].map((m) => (
            <option key={m} value={m}>{m}분</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <select
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          className="w-40"
        >
          {generateTimeOptions().map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <button onClick={addTime} className="bg-blue-500 text-white p-2 rounded">추가</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {startTimes.map((time, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-2xl">
            <span>{time}</span>
            <span
              className="cursor-pointer text-red-500"
              onClick={() => removeTime(time)}
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>

      <div className="mb-4">
        <label>참여 가능 인원</label>
        <br/>
        <input
          type="number"
          min="1"
          value={minParticipants}
          onChange={(e) => setMinParticipants(parseInt(e.target.value))}
        />
        ~
        <input
          type="number"
          min={minParticipants}
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
        />
      </div>

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="금액"
        className="p-2 rounded w-full border-2 border-green rounded-md px-4 py-1"
      />

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="위치"
        className="p-2 rounded w-full border-2 border-green rounded-md px-4 py-1"
      />

      <div className="mb-4">
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

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">클래스 생성</button>
    </div>
    </Container>
  );
};

export default ClassCreationPage;

const Container = styled.div`
  padding: 20px;
`;