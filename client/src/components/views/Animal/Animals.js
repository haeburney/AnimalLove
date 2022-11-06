import React, {useEffect, useState} from 'react';
import Information from "./Information";
import styles from "./Animals.module.css";

function Animals() {
    const [loading, setLoading] = useState(true);
    const [animal, setAnimal] = useState([]);
    const getAnimals = async() => {
        const json = await (
            await fetch(
                /* `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20220101&endde=20221130&pageNo=1&numOfRows=999&_type=json&serviceKey=7LL6m%2F9hLy1EGblVbDDPEBNdFCl6m9Ft%2Fmw2b5wuTaAq2IuINWejMUw46typtDua4NacB9UfALipcKcnoK4PJw%3D%3D`
                 */
                `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20220101&endde=20221130&pageNo=1&numOfRows=500&_type=json&serviceKey=7LL6m%2F9hLy1EGblVbDDPEBNdFCl6m9Ft%2Fmw2b5wuTaAq2IuINWejMUw46typtDua4NacB9UfALipcKcnoK4PJw%3D%3D`
            )).json();
        setAnimal(json.response.body.items.item);
        setLoading(false);
            }
    useEffect(()=>{
       getAnimals();
    }, []) 
    console.log(animal);
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>) : (
                <div className={styles.animals}>{animal.map(animal => (
                    <Information key={animal.desertionNo}
                        id={animal.desertionNo}
                        img={animal.popfile}
                        kindCd={animal.kindCd}
                        age={animal.age}
                        Edt={animal.noticeEdt}
                        
                        noticeNo={animal.noticeNo}
                        orgNm={animal.orgNm}
                        careNm={animal.careNm}
                        careTel={animal.careTel}
                        happenDt={animal.happenDt}
                        neuterYn={animal.neuterYn}
                        state={animal.processState}
                        sexCd={animal.sexCd}
                        special={animal.specialMark}
                        weight={animal.weight}
                        careAddr={animal.careAddr}
                    />
                )
                )}</div>)
            }
        </div>
    )
}

{/* <div key={animal.desertionNo} id={animal.desertionNo}>
                        <Link to={`/Adetail/${animal.desertionNo}`}>
                        <img src={animal.popfile} /></Link>
                        {animal.kindCd}
                        {animal.age}
                        {animal.noticeEdt}
                        {animal.orgNm}
                        {animal.desertionNo}
                        <br />
                        </div> */}

export default Animals;

/*
id,kindCd,age,Edt,orgNm 

 noticeNo, careNm, orgNm, happenDt, neuterYn, state, sexCd, careTel
*/