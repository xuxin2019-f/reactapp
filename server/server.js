const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
// 注意这两个的顺序要在路由的use之前，注意中间件顺序
app.use(cookieParser())
// 实现接收post的参数
app.use(bodyParser.json())
// 与用户相关的：前缀是/user
app.use('/user', userRouter)

app.listen(9093, function () {
  console.log('app is running')
})
