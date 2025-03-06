import React, { useEffect } from "react";

const OdClassMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_MAP_CLIENT_KEY}`;
    script.async = true;
    script.onload = () => {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울 좌표
        zoom: 15,
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default OdClassMap;