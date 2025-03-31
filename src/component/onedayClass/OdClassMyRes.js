import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from "@emotion/styled";
import axios from "axios";

const OdClassMyRes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loginUserId } = state;
  const [MyResData, setMyResData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/ODClassRes/selectMyResList`, {
      params: {
        loginUserId: loginUserId,
      }
    })
    .then((response) => {
      setMyResData(response.data);
    })
    .catch((error) => {
      console.log("데이터 가져오기 실패");
    })
  }, [loginUserId, MyResData]);

  return (
    <Container className="max-w-3xl mx-auto">
    <div style={{ padding: '20px' }}>
      <h2 className="text-2xl font-bold mb-4">내 예약</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {MyResData.map((item) => (
          <li
            key={item.odcclassId}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              padding: '10px 0',
            }}
          >
            <img
              src={item.photoUrl}
              alt={item.title}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                marginRight: '15px',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <Link to={`/onedayClass/${item.odcclassId}`} style={{ textDecoration: 'none' }}>
                <h3>{item.title}</h3>
              </Link>
              <p>방문자성함 : {item.visitorName}</p>
              <p>예약인원 : {item.reservePeople}명</p>
              <p>예약시간 : {item.reserveDate} {item.reserveTime}</p>
              <p>결제금액 : {item.totalPrice}원</p>
            </div>
            <BtnGroup>
              <CancleBtn
                onClick={() => {
                  if (window.confirm('예약을 취소하시겠습니까?')) {
                    axios.get(`${process.env.REACT_APP_BASE_URL}/ODClassRes/cancleReservation`, {
                      params: {
                        resId: item.odcreserveId,
                      }
                    })
                    .then(() => {
                      alert("예약이 취소되었습니다.");
                      setMyResData((prevData) => prevData.filter((data) => data.odcreserveId !== item.odcreserveId));  // 목록에서 삭제
                    })
                    .catch((error) => {
                      console.log("데이터 가져오기 실패");
                    })
                  }
                }}
              >
                예약취소
              </CancleBtn>
              <Link to={`/onedayClass/${item.odcclassId}`} style={{ textDecoration: 'none' }}>
                <DetailBtn>상세보기</DetailBtn>
              </Link>
            </BtnGroup>
          </li>
        ))}
      </ul>
    </div>
    </Container>
  );
};

export default OdClassMyRes;

const Container = styled.div`
  padding: 20px;
`;

const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;

const CancleBtn = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  background-color: #db5454;
  color: white;
  border: none;
`;

const DetailBtn = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  background-color: white;
  color: black;
  border: 1px solid #ddd;
`;