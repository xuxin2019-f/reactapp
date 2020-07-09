/* eslint-disable import/first */
import csshook from 'css-modules-require-hook/preset'

// import assethook from 'asset-require-hook'
// assethook({
//   extensions: ['png'],
// })
require('asset-require-hook')({
  extensions: ['png'],
})

// eslint-disable-next-line import/first
import React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../src/reducer'
import { Provider } from 'react-redux'
// 后端只有StaticRouter
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'
console.log(staticPath)

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const userRouter = require('./user')
const path = require('path')

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

// function App() {
//   return <div>123</div>
// }
// console.log(App())

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
// app.listen(9093,function(){
// 	console.log('Node app start at port 9093')
// })

//路由拦截
app.use((req, res, next) => {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  const store = createStore(reducers, applyMiddleware(thunk))
  let context = {} //跳转相关
  console.log('location', req.url)
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.url}>
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // )
  res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    <link rel="stylesheet" href="/${staticPath.files['main.css']}" />
    <link rel="stylesheet" href="/${staticPath.files['static/css/2.416e3e06.chunk.css']}" />
    <link rel="stylesheet" href="/${staticPath.files['static/css/2.416e3e06.chunk.css.map']}" />
    <link rel="stylesheet" href="/${staticPath.files['static/css/main.e8ced40c.chunk.css.map']}" />
   </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">`)
  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )
  // 把代码往管道上推，并且不结束
  markupStream.pipe(res, { end: false })
  markupStream.on('end', () => {
    res.write(`</div>
    <script src="/${staticPath.files['main.js']}" />
  </body>
</html>`)
    res.end()
  })
  //   const pageHtml = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1" />
  //     <meta name="theme-color" content="#000000" />
  //     <title>React App</title>
  //     <link rel="stylesheet" href="/${staticPath.files['main.css']}" />
  //     <link rel="stylesheet" href="/${staticPath.files['static/css/2.416e3e06.chunk.css']}" />
  //     <link rel="stylesheet" href="/${staticPath.files['static/css/2.416e3e06.chunk.css.map']}" />
  //     <link rel="stylesheet" href="/${staticPath.files['static/css/main.e8ced40c.chunk.css.map']}" />
  //    </head>
  //   <body>
  //     <noscript>You need to enable JavaScript to run this app.</noscript>
  //     <div id="root">${markup}</div>
  //     <script src="/${staticPath.files['main.js']}" />
  //   </body>
  // </html>
  // `
  // console.log('path', path.resolve('build/index.html'))
  // return res.sendFile(path.resolve('build/index.html'))
  res.send(pageHtml)
})
// 设置静态资源
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function () {
  console.log('Node app start at port 9093')
})
