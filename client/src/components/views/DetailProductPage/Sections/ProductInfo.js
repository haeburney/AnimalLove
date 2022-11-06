import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import { MapMarker, Map } from "react-kakao-maps-sdk";
//import  Maps from './Maps';

function ProductInfo(props) {
    const dispatch = useDispatch();

    const clickHandler = () => {

        // 필요한 정보를 cart 필드에다가 넣어 준다.
        // 필요한 것: 상품에 대한 id, 개수, 날짜 정보
        dispatch(addToCart(props.detail._id))


    }


    // 지도 여기부터
   /*  const { kakao } = window;
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()

    const animalMap = props.detail.description
    console.log(animalMap)

    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()
        

        ps.keywordSearch("태민동물병원", (data, status, _pagination) => {
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
 */

    // 지도 여기까지


    return (
        <div>
            <Descriptions title="글 정보">
                {/* <Descriptions.Item label="공고마감일">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="나이">{props.detail.sold}</Descriptions.Item> */}
                {/* <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item> */}
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>

            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shpae="round" type="danger" onClick={clickHandler}>
                    찜하기
                </Button>
            </div>
            <br />
            <br />

           {/*  <Map // 로드뷰를 표시할 Container
                center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                }}
                style={{
                    width: "100%",
                    height: "350px",
                }}
                level={9}
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
            </Map> */}

        </div>
    )
}

export default ProductInfo
