import { Typography, Button, Form, Input } from 'antd'
import Axios from 'axios';
import React, {useState} from 'react'
import FileUpload from '../../utils/FileUpload';

//const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key: 1, value: "실종"},
    {key: 2, value: "정보"},
    {key: 3, value: "우리들의 이야기"},
] 


function UploadProductPage(props) {

    const [Title, setTitle] = useState("")              //제목
    const [Description, setDescription] = useState("")  //설명
    const [Price, setPrice] = useState(0)               //가격
    const [Continent, setContinent] = useState(1)       //장소
    const [Images, setImages] = useState([])             //이미지

    
    const titleChangeHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }
    
    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) =>{
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) =>{
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        /* if(!Title || !Description || !Price || !Continent || !Images){
            return alert("모든 값을 넣어주셔야 합니다.")
        } */

        if(!Title || !Description ||  !Continent || !Images){
            return alert("모든 값을 넣어주셔야 합니다.")
        }
        
        // 서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('글쓰기에 성공 했습니다.')
                    props.history.push('/writing')
                } else {
                    alert('글쓰기에 실패 했습니다.')
                }
            })
        
    }


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
            <h2>글쓰기</h2>
        </div>

        <Form onSubmit={submitHandler}>
            
            {/*<Form onSubmitCapture={submitHandler}> */}

            {/* DropZone */}

            <FileUpload refreshFunction={updateImages}/>

            <br />
            <br />
            <label>제목</label>
            <Input onChange={titleChangeHandler} value={Title}/>
            <br />
            <br />
            <label>설명</label>
            <TextArea onChange={descriptionChangeHandler} value={Description} />
            <br />
            <br />
            {/* <label>가격($)</label>
            <Input type="number" onChange={priceChangeHandler} value={Price}/>
            <br />
            <br /> */}
            <label>게시판</label><br />
            <select onChange={continentChangeHandler} value={Continent}>
                {Continents.map(item =>(
                     <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
            <br />
            <br />
            <Button onClick={submitHandler}>확인</Button>

        </Form>

    </div>
  )
}

export default UploadProductPage
