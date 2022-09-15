import { Icon, Col, Card, Row, Carousel } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
//백엔드 정보 가져오려고
import axios from "axios";
import Meta from 'antd/lib/card/Meta';
import ImagesSlider from '../../utils/ImagesSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        //axios.post('/api/product/products',)
       getProducts(body);

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success){
                    if(body.loadMore) {
                        setProducts(...Products, ...response.data.productInfo)
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }



    const loadMoreHandler = () => {
        //+를 해주면서 다른 상품들도 가져올 수 있게 해야지 

        let skip = Skip + Limit;

        let body = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip);
        //그래야 다음번에 더보기를 눌렀을 때 계속 계속 더해지면서 불러올 수 있다.
    }

    const renderCards = Products.map((product, index) => {

        console.log('product',product)
        
        return <Col lg={6} md={8} xs={24} key={index}>

            <Card
                cover={<ImagesSlider images={product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`${product.price}`}
                />
            </Card>
        </Col>
    })

    const  showFilteredResults = (filters) => {

        let body = {
            skip: 0, // 클릭을 할 때마다 처음부터 보여줘야하기 때문에 0으로 설정
            limit: Limit, 
            filters: filters
        }

        
        getProducts(body)
        setSkip(0)


    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}

        newFilters[category] = filters // continent 아님 price를 가리키고 있는 것

        showFilteredResults(newFilters)
    }
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            {/* Filter */}

            {/* CheckBox */}
             <CheckBox list={continents} handleFilters={ filters => handleFilters(filters, "continents")} />

            {/* RadioBox */}


            {/* Search */}

            {/* Cards */}

            {/*Products.map(product)*/}


            {
            <Row gutter={[16, 16]}> 
                {renderCards} 
            </Row>
            }

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
            
            
        </div>
    )
}

export default LandingPage
