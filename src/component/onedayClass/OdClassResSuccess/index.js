import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const ReservationCompletePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedTime, selectedPeople, totalPrice } = state;

  const handleGoToMain = () => {
    navigate("/onedayClassMain");  // 메인 페이지로 이동
  };

  const handleGoToMyReservations = () => {
    navigate("/my-reservations");  // 내 예약 페이지로 이동 (이 경로는 실제로 구현해주어야 합니다)
  };

  return (
    <Container>
      <h2>예약이 완료되었습니다</h2>
      <Detail>
        <p><strong>예약 날짜:</strong> {selectedDate}</p>
        <p><strong>선택한 시간:</strong> {selectedTime}</p>
        <p><strong>선택한 인원:</strong> {selectedPeople}명</p>
        <p><strong>금액:</strong> {totalPrice}원</p>
      </Detail>
      <ButtonGroup>
        <Button onClick={handleGoToMain}>메인으로</Button>
        <Button onClick={handleGoToMyReservations}>내 예약</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ReservationCompletePage;

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Detail = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007AFF;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #005BBB;
  }
`;
