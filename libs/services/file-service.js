const test_model = require('./../dbs/models/test-model'),
    uuid = require('uuid/v1'),
    console = require('tracer').console(),
    fs=require('fs')

class FileService {
    static getUploadDirName() {
        return `${process.cwd()}\\uploads\\`
    }

    /**检查文件格式
     * 正确格式：
     * name.txt或 name
     * */
    static checkFile(filename) {
        const strs = filename.split('.')

        if (strs.length === 1) {
            return true
        } else if (strs.length === 2) {
            if (strs[1] === 'txt') {
                return true
            }
            return false
        }
    }

    static deleteFile(path) {
        fs.unlink(path,(err)=>{
            if (err)
                console.log(err)
        })
    }

    static getTargetFileName() {
        const date=new Date()
        const str=`${date.getFullYear()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${uuid().toString().substring(0, 8)}`
        return str
    }

    static
    async $save_test() {
        const test = new test_model({data: 'sss'})
        await test.save()
    }
}

module
    .exports = FileService
