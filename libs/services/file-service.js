const uuid = require('uuid/v1'),
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
            return strs[1] === 'txt'
        }
    }

    static deleteFile(path) {
        fs.unlink(path,(err)=>{
            if (err)
                console.log(err)
        })
    }

    /*生成文件名*/
    static getTargetFileName() {
        const date=new Date()
        const name= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${uuid().toString().substring(0, 8)}`
        return name
    }

    /*获取文件内数据*/
    static getData(filePath) {
        const result={
            status:false,
            msg:'',
            data:[]
        }
        try {
            const fileData=fs.readFileSync(filePath).toString()
            const data=JSON.parse(fileData)
            result.status=true
            result.data=data
            return result
        }catch (e) {
            result.msg=e.message
            return result
        }
    }

}

module.exports = FileService
