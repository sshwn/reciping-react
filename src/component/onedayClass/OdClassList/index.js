import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const OdClassList = ({classList}) => {
  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {classList.map((item) => (
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
              <p>👥 {item.minParticipants} ~ {item.maxParticipants}명</p>
              <p>⏰ {item.requiredTime}분</p>
              <p>💰 {item.price}원</p>
              <p>🗺️ {item.location} {item.detailLocation}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OdClassList;