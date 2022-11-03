import React, { useEffect } from 'react'
// const { kakao } = window;
import { MapMarker, Map } from "react-kakao-maps-sdk";

function Maps() {
    return (
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            
          </MapMarker>
        </Map>
      )
}

export default Maps
