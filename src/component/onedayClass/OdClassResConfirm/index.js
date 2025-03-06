import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedTime, selectedPeople, pricePerPerson } = state;

  const totalPrice = selectedPeople * pricePerPerson;

  const handleConfirmReservation = () => {
    // 예약이 완료되면 예약 완료 페이지로 이동
    navigate("/resSuccess", {
      state: {
        selectedDate,
        selectedTime,
        selectedPeople,
        totalPrice
      }
    });
  };

  return (
    <Container>
      <h2>예약 확인</h2>
      <Detail>
        <p><strong>예약 날짜:</strong> {selectedDate}</p>
        <p><strong>선택한 시간:</strong> {selectedTime}</p>
        <p><strong>선택한 인원:</strong> {selectedPeople}명</p>
        <p><strong>금액:</strong> {totalPrice}원</p>
      </Detail>
      <ConfirmButton onClick={handleConfirmReservation}>예약 확정</ConfirmButton>
    </Container>
  );
};

export default ConfirmationPage;

const Container = styled.div`
  padding: 20px;
`;

const Detail = styled.div`
  margin-bottom: 20px;
`;

const ConfirmButton = styled.button`
  padding: 12px;
  width: 100%;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #005BBB;
  }
`;
