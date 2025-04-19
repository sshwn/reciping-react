import React, { useEffect, useRef, useState } from "react";
import OdClassList from '../OdClassList';
import OdClassMap from '../OdClassMap';
import OdClassHeader from '../OdClassHeader';
import axios from "axios";

const OdClassContainer = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [naverReady, setNaverReady] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const allClassesRef = useRef([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const RADIUS_KM = 5;

  // 💡 거리 계산 함수 (Haversine 공식)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const rad = (x) => x * Math.PI / 180;
    const R = 6371; // 지구 반지름 (km)
    const dLat = rad(lat2 - lat1);
    const dLng = rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 현재 사용자의 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const {latitude, longitude} = pos.coords;
      setUserLocation({ lat: latitude, lng: longitude})
    });
  }, []);

  // 클래스 디버깅용
  useEffect(() => {
    console.log("📦 allClasses 상태가 바뀜:", allClasses);
  }, [allClasses]);

  // 클래스 전체 리스트 불러와서 주소를 좌표로 변환
  useEffect(() => {
    if (!userLocation || !naverReady) return;

    axios.get(`${process.env.REACT_APP_BASE_URL}/ODClass/selectODClassList`)
    .then(async (response) => {
      const rawClasses = response.data;

      const geocodePromises = rawClasses.map(cls => {
        return new Promise((resolve) => {
          window.naver.maps.Service.geocode({query: cls.location}, (status, res) => {
            if(status === window.naver.maps.Service.Status.OK && res.v2.addresses.length > 0){
              const { x, y } = res.v2.addresses[0];
              resolve({ ...cls, lat: parseFloat(y), lng: parseFloat(x) });
            } else {
              resolve(null);
            }
          });
        });
      });

      const result = (await Promise.all(geocodePromises)).filter(Boolean);
      if (result.length > 0) {
        setAllClasses(result);
        allClassesRef.current = result;
      }

      // 초기 필터링 -> 현재 위치 기준
      const initFiltered = result.filter((cls) => 
        getDistance(userLocation.lat, userLocation.lng, cls.lat, cls.lng) <= RADIUS_KM
      );
      setFilteredClasses(initFiltered);
    })
    .catch((error) => {
      console.log('데이터 가져오기 실패', error);
    });
  }, [userLocation, naverReady]);

  // 지도를 이동할 때마다 중심 위치로 필터링
  const handleMapMoved = (center) => {
    const nearby = allClassesRef.current.filter((cls) => 
      getDistance(center.lat, center.lng, cls.lat, cls.lng) <= RADIUS_KM
    );
    setFilteredClasses(nearby);
  }

    return (
        <div className="bg-gray-100 p-6 max-w-3xl mx-auto rounded-lg shadow-md">
          <OdClassHeader />
          <OdClassMap userLocation={userLocation} classList={filteredClasses} onMapMove={handleMapMoved} onMapReady={() => setNaverReady(true)} />
          <OdClassList classList={filteredClasses}/>
        </div>
    ); 
}

export default OdClassContainer;