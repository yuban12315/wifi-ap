const mongoose=require('mongoose')
const config=require('./config')

// const opt={
//     user: config.user,
//     pass: config.pass,
//     auth: {
//         authdb: config.db
//     }
// }
mongoose.Promise = Promise
const db=mongoose.connect(config.url,{useMongoClient: true})
db.on('error',function(error) {
    console.log(`数据库连接失败：${error}`)
})

// db.on('open',function() {
//     console.log('数据库连成功')
// })

module.exports=mongoose