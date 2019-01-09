const test_model = require('./../dbs/models/test-model')

class FileService {
    static getUploadDirName() {
        return `${process.cwd()}/uploads`
    }

    static async $save_test() {
        const test = new test_model({data: 'sss'})
        await test.save()
    }
}

module.exports = FileService
