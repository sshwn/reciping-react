import React from 'react';
import { Link } from 'react-router-dom';

const OdClassData = [
  {
    id: 1,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '쌀국수 만들기 원데이 클래스',
    availablePeople: 4,
    duration: '2시간',
    pricePerPerson: '50,000원'
  },
  {
    id: 2,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '휘낭시에 만들기',
    availablePeople: 2,
    duration: '1시간 30분',
    pricePerPerson: '30,000원'
  },
  {
    id: 3,
    image: 'https://newsimg.sedaily.com/2022/04/21/264S35NT4X_1.jpg',
    title: '쿠키 만들기 (초급)',
    availablePeople: 6,
    duration: '3시간',
    pricePerPerson: '70,000원'
  }
];

const OdClassList = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {OdClassData.map((item) => (
            <li
                key={item.id}
                style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                padding: '10px 0',
                }}
            >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                marginRight: '15px',
              }}
            />
            <div style={{textAlign : 'left'}}>
              <Link to={`/onedayClass/${item.id}`} style={{ textDecoration: 'none' }}>
                <h3>{item.title}</h3>
              </Link>
              <p>👥 {item.availablePeople}명</p>
              <p>⏰ {item.duration}</p>
              <p>💰 {item.pricePerPerson}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OdClassList;