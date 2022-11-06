import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Adetail from './Adetail';
import styles from "./Information.module.css";
import { MapMarker, Map } from "react-kakao-maps-sdk";

/* export function onClick({ kindCd }){
    return (
    <div>{kindCd}</div>
    )
} */


function Information({ id, img, kindCd, age, Edt, orgNm,  noticeNo, careNm, happenDt, neuterYn, state, sexCd, careTel, special, weight, careAddr }) {
    const [add, setAdd] = useState(false);
   // 지도
   const { kakao } = window;
   const [info, setInfo] = useState()
   const [markers, setMarkers] = useState([])
   const [map, setMap] = useState()
 
   useEffect(() => {
     if (!map) return
     const ps = new kakao.maps.services.Places()
 
     ps.keywordSearch(careNm, (data, status, _pagination) => {
       if (status === kakao.maps.services.Status.OK) {
         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
         // LatLngBounds 객체에 좌표를 추가합니다
         const bounds = new kakao.maps.LatLngBounds()
         let markers = []
 
         for (var i = 0; i < data.length; i++) {
           // @ts-ignore
           markers.push({
             position: {
               lat: data[i].y,
               lng: data[i].x,
             },
             content: data[i].place_name,
           })
           // @ts-ignore
           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
         }
         setMarkers(markers)
 
         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
         map.setBounds(bounds)
       }
     })
   }, [map])
 
   /* return (
     <Map // 로드뷰를 표시할 Container
       center={{
         lat: 37.566826,
         lng: 126.9786567,
       }}
       style={{
         width: "100%",
         height: "350px",
       }}
       level={3}
       onCreate={setMap}
     >
       {markers.map((marker) => (
         <MapMarker
           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
           position={marker.position}
           onClick={() => setInfo(marker)}
         >
           {info &&info.content === marker.content && (
             <div style={{color:"#000"}}>{marker.content}</div>
           )}
         </MapMarker>
       ))}
     </Map> */

   // 지도


    return (
        <div className={styles.animal}>
            <img src={img} alt={id} className={styles.animal__img}/> 
           {/*  <div>
                <Link to={`/animal/${id}`} >
                    <img src={img} alt={id} /> 
                </Link>
            </div> */}
            <p>
                <div className={styles.info}>
                {kindCd} &nbsp; / 성별 : {sexCd} 
                </div>
                <br />
                나이 : {age}   <br />
                몸무게 : {weight} <br /> 
                공고 종료일 : {Edt}   <br />
                보호 센터 : {careNm} <br /><br /> 
                <div onClick={() => setAdd(!add)} className={styles.add} >
                    {(add ?
                        <div>
                            현재 상태 : {state}  <br />
                            공고 번호 : {noticeNo} <br />
                            발견 날짜 : {happenDt} <br />
                            중성화 여부 : {neuterYn} <br />
                            전화 번호 : {careTel} <br />
                            특이사항 : {special} <br />
                            <Map // 로드뷰를 표시할 Container
                                center={{
                                    lat: 37.566826,
                                    lng: 126.9786567,
                                }}
                                style={{
                                    width: "100%",
                                    height: "350px",
                                }}
                                level={3}
                                onCreate={setMap}
                            >
                                {markers.map((marker) => (
                                    <MapMarker
                                        key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                                        position={marker.position}
                                        onClick={() => setInfo(marker)}
                                    >
                                        {info && info.content === marker.content && (
                                            <div style={{ color: "#000" }}>{marker.content}</div>
                                        )}
                                    </MapMarker>
                                ))}
                            </Map><br />
                            <button className={styles.button}>닫기</button>
                        </div>
                        :
                        <button className={styles.button}>자세히</button>)}
                </div>

            </p>

        </div>
    )
}

Information.propTypes = {
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    kindCd: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    Edt: PropTypes.string.isRequired,
    orgNm: PropTypes.string.isRequired,
}

export default Information;

/* id : desertionNo 아이디 img 사진 kindCd 개종류 age 나이 Edt 공고종료일  
orgNm 장소  noticeNo 번호 careNm 보호소 이름  happenDt 발견날짜 
neuterYn 중성화여부 state 상태  sexCd 성  careTel  보호소? 전번 */