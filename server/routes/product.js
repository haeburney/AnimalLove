const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage }).single("file")


router.post('/image', (req, res) => {

    //가져온 이미지를 저장 해주면 된다.
    upload(req, res, (err) => {
        if(err) {
            return req.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        // 파일을 어디에, 무슨 이름으로 저장했는지 전달해주는 역할
    })

})


router.post('/', (req, res) => {

  // 받아온 정보들을 DB에 넣어 준다.

  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})

router.post('/products', (req, res) => {

  // product collection에 들어 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20; //숫자는 마음대로
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm

  let findArgs = {}; // object 정의 

  for(let key in req.body.filters){
    //key는 LandingPage의 continents 아니면 price를 뜻함

    if(req.body.filters[key].length > 0 ){

      if(key === "price"){
        findArgs[key] = {
          // Greater than equal
          $gte: req.body.filters[key][0], // gte 몽고 디비에서 사용하는 것
          // Less than equal
          $lte: req.body.filters[key][1]
        } 
      } else{
        findArgs[key] = req.body.filters[key];
      }
    
    }
  }

  console.log('findArgs', findArgs)

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } }) // text 검색으로 -> 몽고 DB 
      .populate("writer") // 상품을 누가 등록했는지에 대한 정보 
      .skip(skip) // 몽고 디비에 알려주는 것 8개만 가져와
      .limit(limit) // 0~8번째까지만 가져와~
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })
  } else {
    Product.find(findArgs)
      .populate("writer") // 상품을 누가 등록했는지에 대한 정보 
      .skip(skip) // 몽고 디비에 알려주는 것 8개만 가져와
      .limit(limit) // 0~8번째까지만 가져와~
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })
  }



})


router.get("/products_by_id", (req, res) => {
 

  let type = req.query.type
  let productIds = req.query.id

  if( type === "array" ) {
    // id = 39482, 19284, 49584 이거를
    // productIds = ['39482', '19284', '49584'] 이런 식으로 바꿔준다. 
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item
    })
  }

   // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
})


//axios.get(`/api/product/products_by_id?id=${productId}&type=single`)


module.exports = router;
