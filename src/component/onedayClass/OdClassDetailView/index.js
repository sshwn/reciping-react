import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from "@emotion/styled";
import BottomSheet from "../../bottomSheet/index";
import useMeasure from "react-use-measure";
import SelectResInfo from "../OdClassSelectResInfo/index";
import axios from "axios";

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

const OdClassDetailView = () => {
  const { id } = useParams();
  const [ODClassDetailViewData, setODClassDetailViewData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/ODClass/selectODClassDetail`, {
      params : {
        ODCClassId : id // 파라미터 값으로 원데이클래스 고유아이디 보냄
      }
    })
    .then((response) => {
      setODClassDetailViewData(response.data);
    })
    .catch((error) => {
      console.log("데이터 가져오기 실패");
    })
  }, [id])
  const [viewportRef, { height: viewportHeight }] = useMeasure();

  if (!ODClassDetailViewData) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Background>
      <Mobile ref={viewportRef}>
        <Content className="max-w-3xl mx-auto">
          <div style={{ padding: '20px' }}>
          <img
            src={ODClassDetailViewData.photoUrl}
            alt={ODClassDetailViewData.title}
            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
          />
          <h2>{ODClassDetailViewData.title}</h2>
          <p>예약 가능 인원: {ODClassDetailViewData.minParticipants} ~ {ODClassDetailViewData.maxParticipants}명</p>
          <p>소요 시간: {ODClassDetailViewData.requiredTime}시간</p>
          <p>인당 금액: {ODClassDetailViewData.price}원</p>
          <p>위치: {ODClassDetailViewData.location} {ODClassDetailViewData.detailLocation}</p>
          <p>{ODClassDetailViewData.content}</p>
          </div>
        </Content>
        <BottomSheet viewport={`${viewportHeight}px`}>
          <SelectResInfo 
            id={id}
            startTimesArray={ODClassDetailViewData.odcClassTimeMappingList}
            minParticipants={ODClassDetailViewData.minParticipants}
            maxParticipants={ODClassDetailViewData.maxParticipants}
            price={ODClassDetailViewData.price}
          />
        </BottomSheet>
      </Mobile>
    </Background>
  );
};

export default OdClassDetailView;
