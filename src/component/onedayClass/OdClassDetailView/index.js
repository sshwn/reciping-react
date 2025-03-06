import React from 'react';
import { useParams } from 'react-router-dom';
import styled from "@emotion/styled";
import BottomSheet from "../../bottomSheet/index";
import useMeasure from "react-use-measure";
import SelectResInfo from "../OdClassSelectResInfo/index";

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* 모바일처럼 보이게 하려고 해당 부분을 추가해 놓은건데 일단 주석 처리함 */
  // width: 100vw;
  // height: 100dvh;
`;

const Mobile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; /* 자식 요소를 위아래로 배치 */

  width: 100%;
  /* 모바일처럼 보이게 하려고 해당 부분을 추가해 놓은건데 일단 주석 처리함 */
  // max-width: 350px;
  height: calc(105dvh - 60px);

  /* 모바일처럼 보이게 하려고 해당 부분을 추가해 놓은건데 일단 주석 처리함 */
  // border-radius: 24px;
  overflow: hidden;

  box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  width: 100%;
  padding: 24px;
  flex-grow: 1; /* 남은 공간을 차지하도록 함 */
  overflow-y: auto; /* 본문에 스크롤이 생길 수 있도록 함*/
  padding-bottom: 130px; /* 본문에 스크롤이 생겼을 때 bottom sheet의 헤더에 내용이 가려지는 현상 발생으로 추가 */
`;

const OdClassDetailViewData = [
  {
    id: 1,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '예약 1',
    availablePeople: 4,
    duration: '2시간',
    pricePerPerson: '50,000원',
    description: '이곳에서 즐거운 시간을 보낼 수 있습니다.'
  },
  {
    id: 2,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '예약 2',
    availablePeople: 2,
    duration: '1시간 30분',
    pricePerPerson: '30,000원',
    description: '이곳에서 특별한 순간을 만들어 보세요.'
  },
  {
    id: 3,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '예약 3',
    availablePeople: 6,
    duration: '3시간',
    pricePerPerson: '70,000원',
    description: '가족과 함께 즐기기 좋은 장소입니다.'
  }
];

const OdClassDetailView = () => {
  const { id } = useParams();
  const onedayClass = OdClassDetailViewData.find((item) => item.id === parseInt(id));
  const [viewportRef, { height: viewportHeight }] = useMeasure();

  if (!onedayClass) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Background>
      <Mobile ref={viewportRef}>
        <Content>
          <div style={{ padding: '20px' }}>
          <img
            src={onedayClass.image}
            alt={onedayClass.title}
            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
          />
          <h2>{onedayClass.title}</h2>
          <p>{onedayClass.description}</p>
          <p>예약 가능 인원: {onedayClass.availablePeople}명</p>
          <p>소요 시간: {onedayClass.duration}</p>
          <p>인당 금액: {onedayClass.pricePerPerson}</p>
          </div>
        </Content>
        <BottomSheet viewport={`${viewportHeight}px`}>
          <SelectResInfo />
        </BottomSheet>
      </Mobile>
    </Background>
  );
};

export default OdClassDetailView;
