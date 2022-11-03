import React, {useState} from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Adetail from './Adetail';
import styles from "./Information.module.css";

/* export function onClick({ kindCd }){
    return (
    <div>{kindCd}</div>
    )
} */


function Information({ id, img, kindCd, age, Edt, orgNm,  noticeNo, careNm, happenDt, neuterYn, state, sexCd, careTel, special, weight }) {
    const [add, setAdd] = useState(false);
   
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
                            전화 번호 : {careTel} <br /><br />
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