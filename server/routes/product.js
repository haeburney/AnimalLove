const express = require('express');
const router = express.Router();
const multer = require('multer');

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
        return res.json({ seuccess: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        // 파일을 어디에, 무슨 이름으로 저장했는지 전달해주는 역할
    })

})




module.exports = router;
