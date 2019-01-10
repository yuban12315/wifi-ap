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

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     next()
// })

app.use('/', index)
//app.use('/users', users);

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

module.exports = app
