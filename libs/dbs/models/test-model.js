const mongoose=require('../mongoose')

const test_schema=new mongoose.Schema({
    data:String
})

const test_model=mongoose.model('test',test_schema)

module.exports=test_model