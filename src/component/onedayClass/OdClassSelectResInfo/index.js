import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const BottomSheetContent = ({minSelectableTime, maxSelectableTime, requiredTime, totalParticipants, price}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const timeOptions = ["11:00", "12:00", "13:00"];
  const peopleOptions = Array.from({length : totalParticipants}, (_, idx) => idx + 1);
  const pricePerPerson = price; // 금액 예시 (50,000원)

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(null);  // 날짜 변경 시 시간 초기화
    setSelectedPeople(null);  // 날짜 변경 시 인원 초기화
  };

  const handleReserve = () => {
    if (selectedDate && selectedTime && selectedPeople) {
      navigate("/confirmation", {
        state: {
          selectedDate,
          selectedTime,
          selectedPeople,
          pricePerPerson,
        },
      });
    }
  };

  return (
    <Container>
      <Section>
        <h3>날짜 선택</h3>
        <input
          type="date"
          onChange={handleDateChange}
          value={selectedDate || ""}
        />
      </Section>

      {selectedDate && (
        <Section>
          <h3>시간 선택</h3>
          <ButtonGroup>
            {timeOptions.map((time) => (
              <Button
                key={time}
                onClick={() => setSelectedTime(time)}
                isSelected={selectedTime === time}
              >
                {time}
              </Button>
            ))}
          </ButtonGroup>
        </Section>
      )}

      {selectedTime && (
        <Section>
          <h3>인원 선택</h3>
          <ButtonGroup>
            {peopleOptions.map((people) => (
              <Button
                key={people}
                onClick={() => setSelectedPeople(people)}
                isSelected={selectedPeople === people}
              >
                {people}명
              </Button>
            ))}
          </ButtonGroup>
        </Section>
      )}

      <ReserveButton disabled={!selectedDate || !selectedTime || !selectedPeople} onClick={handleReserve}>
        예약하기
      </ReserveButton>
    </Container>
  );
};

export default BottomSheetContent;

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.isSelected ? "#007AFF" : "#ddd")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.isSelected ? "#005BBB" : "#ccc")};
  }
`;

const ReserveButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.disabled ? "#ccc" : "#007AFF")};
  color: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#005BBB")};
  }
`;
