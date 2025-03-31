import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id, selectedDate, selectedTime, selectedPeople, pricePerPerson } = state;
  const totalPrice = selectedPeople * pricePerPerson;

  const [regUserName, setRegUserName] = useState("홍길동"); // TODO 로그인한 사용자로 변경해야 함
  const [regUserPhoneNum, setRegUserPhoneNum] = useState("010-1111-2222");
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhoneNum, setVisitorPhoneNum] = useState("");
  const [isSameAsRegUser, setIsSameAsRegUser] = useState(false);

  // 신청자와 동일 체크박스 클릭 시
  const handleCheckboxChange = () => {
    const newCheckedState = !isSameAsRegUser;
    setIsSameAsRegUser(newCheckedState);
    setVisitorName(newCheckedState ? regUserName : "");
    setVisitorPhoneNum(newCheckedState ? regUserPhoneNum : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // 폼 데이터 가져오기
    const data = Object.fromEntries(formData.entries()); // 객체로 변환
    data.reserveDate = selectedDate;
    data.reserveTime = selectedTime;
    data.reservePeople = selectedPeople;
    data.totalPrice = totalPrice;
    data.regUserId = regUserName; // TODO 로그인한 사용자 id로 바꿔야함
    data.regUserPhoneNum = regUserPhoneNum;
    data.visitorSameYn = isSameAsRegUser?'Y':'N';
    data.ODCClassId = Number(id);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/ODClass/saveODClassReservation`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });

      // 예약이 완료되면 예약 완료 페이지로 이동
      navigate("/resSuccess", {
        state: {
          selectedDate,
          selectedTime,
          selectedPeople,
          totalPrice
        }
    });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("폼 제출에 실패했습니다."); // 에러 메시지
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="max-w-3xl mx-auto">
        <InfoMsg1>아래 내용이 맞는지 확인해 주세요</InfoMsg1>
        <SelectDetail>
          <p><Title>베이킹 클래스</Title></p>
          <p><strong>일정</strong> {selectedDate} {selectedTime}</p>
          <p><strong>인원</strong> {selectedPeople}명</p>
        </SelectDetail>
        <PriceDiv>
          <PriceP><Price>결제 금액</Price> <TotalPrice>{totalPrice}원</TotalPrice></PriceP>
        </PriceDiv>
        <Divider />
        <RegisterDetail>
          <Title>신청자 정보</Title>
          <input type="text" value={regUserName}
            id="regUserName" readOnly
            className="p-2 rounded w-full"/>
          <br/>
          <input type="text" value={regUserPhoneNum}
            id="regUserPhoneNum" readOnly
            className="p-2 rounded w-full"/>
          <DividerNoLine />
          <Title>방문자 정보</Title>
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="sameAsRegUser"
              checked={isSameAsRegUser}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="sameAsRegUser">신청자와 동일</label>
          </div>
          <table>
            <tr>
              <td width="60px">성함</td>
              <td>
                <input type="text" name="visitorName" value={visitorName} id="visitorName" 
                  onChange={(e) => setVisitorName(e.target.value)} readOnly={isSameAsRegUser} 
                  className="flex-1 border-2 border-green rounded-md px-4 py-1" />
              </td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>
                <input type="text" name="visitorPhoneNum" value={visitorPhoneNum} id="visitorPhoneNum" 
                  onChange={(e) => setVisitorPhoneNum(e.target.value)} readOnly={isSameAsRegUser} 
                  className="flex-1 border-2 border-green rounded-md px-4 py-1" />
              </td>
            </tr>
          </table>
        </RegisterDetail>
        <Divider />
        <RegisterDetail>
          <Title>요청사항</Title>
          <RequestMessage id="requestMessage" name="requestMessage">
          </RequestMessage>
        </RegisterDetail>
        <InfoMsg2>
          예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공 규정을 확인하였으며 이에 동의합니다.
        </InfoMsg2>
        <ConfirmButton type="submit">동의하고 예약하기</ConfirmButton>
      </Container>
    </form>
  );
};

export default ConfirmationPage;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const PriceDiv = styled.div`
  padding: 10px 25px 10px 25px;
  font-size: 20px;
  font-weight: bold;
`;

const PriceP = styled.p`
  display: flex;
`;

const Price = styled.div`
  width: 50%;
`;

const TotalPrice = styled.div`
  width: 50%;
  color: red;
  text-align: right;
`;

const SelectDetail = styled.div`
  margin: 20px 0px 15px 0px;
  border: 2px solid #808080;
  border-radius: 30px;
  padding: 15px 25px 15px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 2px solid #808080;
  margin: 10px 10px;
`;

const DividerNoLine = styled.hr`
  margin: 10px;
`;

const RegisterDetail = styled.div`
  margin: 10px 0px 10px 0px;
  padding: 15px 25px 15px;
`;

const RequestMessage = styled.textarea`
  resize : none;
  width: 100%;
  height: 130px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
`;

const InfoMsg1 = styled.div`
  padding: 0 5px 0 5px;
`;

const InfoMsg2 = styled.div`
  padding: 0 5px 15px 5px;
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
