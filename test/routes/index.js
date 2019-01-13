const request = require('superagent')

request.post('http://127.0.0.1:3000/upload').attach('file', `${__dirname}\\test.txt`)
    .end((err,res)=>{
        if (err)console.log(err)
        if (res)console.log(res.res.text)
    })