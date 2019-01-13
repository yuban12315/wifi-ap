const fileService = require('./../../libs/services/file-service')

const result=fileService.getData(`${__dirname}\\test.txt`)

console.log(result)
