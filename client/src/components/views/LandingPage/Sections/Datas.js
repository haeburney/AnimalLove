const continents = [
    { 
        "_id": 1,
        "name": "서울"
    },
    {
        "_id": 2,
        "name": "경기도"
    },
    {
        "_id": 3,
        "name": "대전"
    },
    {
        "_id": 4,
        "name": "강원도"
    },
    {
        "_id": 5,
        "name": "인천"
    },
    {
        "_id": 6,
        "name": "충청도"
    },
    {
        "_id": 7,
        "name": "전라도"
    },
    {
        "_id": 8,
        "name": "경상도"
    },
    {
        "_id": 9,
        "name": "울산"
    },
    {
        "_id": 10,
        "name": "부산"
    },
    {
        "_id": 11,
        "name": "제주도"
    },
]

const price = [
    {
        "_id" : 0,
        "name" : "Any",
        "array" : []
    },
    {
        "_id" : 1,
        "name" : "$0 to $99",
        "array" : [0, 199]
    },
    {
        "_id" : 2,
        "name" : "$200 to $249",
        "array" : [200, 249]
    },
    {
        "_id" : 3,
        "name" : "$250 to $279",
        "array" : [250, 279]
    },
    {
        "_id" : 4,
        "name" : "$280 to $299",
        "array" : [280, 299]
    },
    {
        "_id" : 5,
        "name" : "More than $300",
        "array" : [300, 1500000]
    }
]

export {
    continents,
    price
}