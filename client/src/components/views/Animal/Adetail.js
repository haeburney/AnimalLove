import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Information from './Information';

function Adetail() {
    const { id } = useParams();
    const [detail, setDetail] = useState([]);

    const [animal, setAnimal] = useState([]);
    const getAnimals = async () => {
        const json = await (
            await fetch(
                `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20220101&endde=20221130&pageNo=1&numOfRows=999&_type=json&serviceKey=7LL6m%2F9hLy1EGblVbDDPEBNdFCl6m9Ft%2Fmw2b5wuTaAq2IuINWejMUw46typtDua4NacB9UfALipcKcnoK4PJw%3D%3D`
            )).json();
        setAnimal(json.response.body.items.item);
        console.log(json.response.body.items.item.age);

    }


    useEffect(() => {
        getAnimals();
    }, [])

    console.log(id)
    return (
        <div>
            
            {animal.map((animal, index) =>
                

                <li key={index}>
                    <img src={animal.filename} />
                    {animal.kindCd}  {animal.colorCd}
                </li>)}

        </div>

    );
}

export default Adetail
