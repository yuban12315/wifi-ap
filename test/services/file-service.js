const fileService=require('./../../libs/services/file-service')

const testModel=require('./../../libs/dbs/models/test-model')

try {
    const test=new testModel({data:'sss'})
    test.data='qqq'
    test.save((error,res)=>{
        console.log(res)
    })
}catch (e) {
    console.log(e)
}