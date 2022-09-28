import { Icon, Col, Card, Row, Carousel } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
//백엔드 정보 가져오려고
import axios from "axios";
import Meta from 'antd/lib/card/Meta';
import ImagesSlider from '../../utils/ImagesSlider';
import CheckBox from './Sections/CheckBox';
import { continents, price } from './Sections/Datas'
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';


function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) // 처음에 0부터
    const [Limit, setLimit] = useState(8) // 8개씩 보여줄거야 
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
        
    }, [])


    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if(body.loadMore){
                        //더보기 버튼 누르면 그 전에껏도 다 보이게
                        setProducts([...Products, ...response.data.productInfo ])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })
    }

    const loadMoreHandler = () => {
        // 더보기를 클릭하면 나머지 중 8개를 가져와야 함! 

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,

        }

        getProducts(body)
        setSkip(skip) // skip 숫자 업데이트해주는 것
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}  key={index}>

            <Card
                cover={<a href={`/product/${product._id}`}> <ImagesSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const  showFilteredResults = (filters) => {
        
        let body = {
            skip: 0, // 새로 누를 때마다 새로 시작에 돼야하기 때문에
            limit: Limit, 
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data){
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
                //"array" : [0, 199] 
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters}

        newFilters[category] = filters 
        //continent랑 price를 나타내는 것

        //console.log('filters', filters)

        if(category === "price"){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

   
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>유기동물 공고 보기<Icon type="rocket" /></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

           
         


            {/* Search */}
            <div style={{ display:'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchFeature 
                    refreshFuntion={updateSearchTerm}
                />
            </div>

            {/* Cards */}

            {/*Products.map(product)*/}


            {<Row gutter={[16, 16]}> 
                {renderCards} 
            </Row>}

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
