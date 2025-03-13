import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const OdClassList = () => {
  const [OdClassData, setODClassData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/ODClassList/selectODClassList`)
    .then((response) => {
      setODClassData(response.data);
    })
    .catch((error) => {
      console.log("데이터 가져오기 실패");
    })
  }, []); // 처음 한번만 실행하도록 함

  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {OdClassData.map((item) => (
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
            <div style={{textAlign : 'left'}}>
              <Link to={`/onedayClass/${item.odcclassId}`} style={{ textDecoration: 'none' }}>
                <h3>{item.title}</h3>
              </Link>
              <p>👥 1 ~ {item.totalParticipants}명</p>
              <p>⏰ {item.requiredTime}시간간</p>
              <p>💰 {item.price}원</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OdClassList;