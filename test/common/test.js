const request = require('superagent')

request.post('http://127.0.0.1:3000/upload/')
    .attach('file', `${__dirname}/test.txt`).end((error, res) => {
        if (error)
            console.log(error.response)
        else
            console.log(res.res.text)
    })