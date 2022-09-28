import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {

        // 필요한 정보를 cart 필드에다가 넣어 준다.
        // 필요한 것: 상품에 대한 id, 개수, 날짜 정보
        dispatch(addToCart(props.detail._id))

    
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="description">{props.detail.description}</Descriptions.Item>

            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shpae="round" type="danger" onClick={clickHandler}>
                    찜하기
                </Button>
            </div>

        </div>
    )
}

export default ProductInfo
