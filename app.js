const express = require('express')
const config = require('./libs/dbs/config')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const console=require('tracer').console()

const index = require('./routes/index')
// const users = require('./routes/users')
const position=require('./routes/position')

const app = express()
//http://123.206.92.213:3000/
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret: config.secret,
    cookie:config.cookieExpectTime,
    store:new MongoStore({
        url:config.url,
        useConnectionPooling: true
    })

}))
app.use(express.static(path.join(__dirname, 'public')))
/*跨域*/
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (req.method === 'OPTIONS') {
        res.send(200) //让options请求快速返回
    }
    else {
        next()
    }
})

app.use('/', index)
//app.use('/users', users);
app.use('/position',position)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    //res.render('error')

    /*在控制台输出err，向客户端返回json数据*/
    res.send({
        status:err.status||500,
        msg:err.message
    })
    //
    console.log(err.message)
    console.log(err.stack)

})

console.log('Server running on http://127.0.0.1:3000/')
module.exports = app
