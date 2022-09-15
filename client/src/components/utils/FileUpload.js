import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {

  const [Images, setImages] = useState([]);
  //이미지를 몇개 올릴 수 있게 하기 위해서 배열로 생성

  const dropHandler = (files) => {
    // 파일을 backend에 전달해줘야 한다.
    // 그리고 파일을 전달 할 때 따로 해줘야 하는게 있다.

    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data'}
    };
    formData.append("file", files[0]);

    Axios.post('/api/product/image', formData, config).then((response) => {
        if (response.data.success){
            setImages([...Images, response.data.filePath])
            props.refreshFunction([...Images, response.data.filePath])
        } else {
            alert('파일을 저장하는데 실패했습니다.')
        }
      });
    // formData와 config를 넣어주지 않으면은 파일을 보낼 때 에러가 발생하게 된다. 
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image)
    let newImages = [...Images]
    newImages.splice(currentIndex, 1)
    setImages(newImages)
    props.refreshFunction(newImages)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={dropHandler}>
              {({ getRootProps, getInputProps }) => (
                  <section>
                      <div
                          style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}
                          {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Icon type="plus" style={{ fontSize: '3rem'}} />
                      </div>
                  </section>
              )}
          </Dropzone>

          <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>

            {Images.map((image, index) => (
              <div onClick={()=> deleteHandler(image)} key={index}>
                <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                  src={`http://localhost:5000/${image}`} 
                />
              </div>  
            ))}
          </div>
    </div>
  )
}

export default FileUpload
