const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')

const app = express()
// io与express配合
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io是全局的请求，socket是当前的请求
io.on('connection', function (socket) {
  console.log('user login')
  socket.on('sendMsg', (data) => {
    console.log(data)
    // 全局的发送
    const { from, to, msg } = data
    // 两者之间无论聊天顺序如何都共用同一个id
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
// app.listen(9093,function(){
// 	console.log('Node app start at port 9093')
// })
server.listen(9093, function () {
  console.log('Node app start at port 9093')
})
