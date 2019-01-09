const express = require('express')
const router = express.Router()
const multer = require('multer'),
    console = require('tracer').console(),
    file_service=require('./../libs/services/file-service'),
    test_service=require('./../libs/services/test-service')

const upload = multer({dest: 'upload/'}).any()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})
router.get('/test',async(req,res)=>{
    await file_service.$save_test()
    res.send('sss')
})
router.post('/', (req, res) => {
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     req.file = req.files[0]
    //     let temp = req.file.path
    //     let path=file_service.getUploadDirName()
    // })
})

module.exports = router
