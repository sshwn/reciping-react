import React, { useEffect, useRef } from "react";

const OdClassMap = ({userLocation, classList, onMapMove, onMapReady}) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if(!userLocation) return;

    const loadMapScript = () => {
      if(document.getElementById("naver-map-script")) {
        waitUntilNaverMapReady();
        return;
      }
      
      const script = document.createElement("script");
      script.id = "naver-map-script";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_MAP_CLIENT_KEY}&submodules=geocoder`;
      script.async = true;
      script.onload = () => waitUntilNaverMapReady();
      document.head.appendChild(script);
    };

    const waitUntilNaverMapReady = () => {
      const intervalId = setInterval(() => {
        if (
          window.naver &&
          window.naver.maps &&
          window.naver.maps.Map &&
          window.naver.maps.Marker &&
          window.naver.maps.Service
        ) {
          clearInterval(intervalId);
          onMapReady?.(); // 부모 쪽 (OdClassMainContainer)에 네이버 지도api 준비가 완료됨을 알림
          initMap(); // 지도 초기화
        }
      }, 100);
    };

    const initMap = () => {
      const {naver} = window;
      if(!naver) return;

      // 지도 초기화
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(userLocation.lat, userLocation.lng), // 사용자 좌표
        zoom: 13,
      });

      // 지도 이동 이벤트
      naver.maps.Event.addListener(mapRef.current, "idle", () => {
        const center = mapRef.current.getCenter();
        onMapMove({lat: center.lat(), lng: center.lng()});
      });
      renderMarkers();
    };

    const renderMarkers = () => {
      if (!mapRef.current || !window.naver || !window.naver.maps) return;

      // 기존 마커 제거
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      classList.forEach((cls) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(cls.lat, cls.lng),
          map: mapRef.current,
          title: cls.title,
        });
        markersRef.current.push(marker);
      });
    };

    loadMapScript();
  }, [userLocation]);

  useEffect(() => {
    if(!mapRef.current || !window.naver || !window.naver.maps) return;

    const {naver} = window;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    classList.forEach((cls) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(cls.lat, cls.lng),
        map: mapRef.current,
        title: cls.title,
      });
      markersRef.current.push(marker);
    });
  }, [classList]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default OdClassMap;