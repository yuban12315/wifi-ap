const express=require('express')
const router = express.Router()
const console=require('tracer').console()
const position_service=require('../libs/services/position-service')

//返回定位信息
router.get('/list',(req,res)=>{
    res.send({
        status:true,
        data:position_service.testData()
    })
})

//安卓设备上传wifi数据
router.post('/data',(req,res)=>{
    res.send(111)
})

module.exports = router