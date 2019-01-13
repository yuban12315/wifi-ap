const express = require('express')
const router = express.Router()
const multer = require('multer'),
    fs = require('fs'),
    console = require('tracer').console(),
    file_service = require('./../libs/services/file-service'),
    data_service=require('./../libs/services/data-service')

const upload = multer({dest: 'uploads/'}).any()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})
router.get('/test', async (req, res, next) => {
    const data = req.query
    const flag = file_service.checkFile(data.name)
    if (flag) {
        const err = new Error('文件名错误，请检查文件名')
        err.status = 400
        next(err)
    } else res.send(flag)
})

router.post('/upload', async (req, res, next) => {
    upload(req, res, (err) => {
        const response={
            status: false,
            msg: ''
        }
        if (err) {
            console.error(err)
            return next(err)
        }
        req.file = req.files[0]
        const temp = req.file.path
        const path = file_service.getUploadDirName()
        if (!file_service.checkFile(req.file.originalname)) {
            response.msg='文件格式错误'
            file_service.deleteFile(temp)
            res.send(response)
        }else {
            const target_path = path + file_service.getTargetFileName()
            console.log(temp)
            console.log(target_path)

            //判断文件夹是否存在
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path)
            }

            const src = fs.createReadStream(temp)
            const dest = fs.createWriteStream(`uploads/${file_service.getTargetFileName()}`)
            src.pipe(dest)
            src.on('end', async () => {
                
                //获取数据 result
                const result = file_service.getData(temp)
                let status=false
                if (!result.status) {
                    response.msg = result.msg
                } else {
                    //检查数据结构 result1
                    const result1 = data_service.checkMany(result.data)
                    if (!result1.status) {
                        response.msg = result1.msg
                    } else {
                        //存储ap数据 result2
                        const result2 = await data_service.save(result.data)
                        response.msg = result2.msg
                        status=result2.status
                    }
                }
                /*删除temp文件*/
                file_service.deleteFile(temp)
                response.status = status
                res.send(response)
            })
            src.on('err', (err) => {
                next(err)
            })
        }

    })

})

module.exports = router
