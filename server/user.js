// 用户的接口
const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

// 统一设置返回给客户端时不要显示密码
const _filter = { pwd: 0 }

Router.get('/list', (req, res) => {
  // User.find({}, (err, doc) => {
  //   res.json(doc)
  // })
  const { type } = req.query
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, data: doc })
  })
})
Router.get('/info', (req, res) => {
  // 在request中取出客户端每次请求过来时携带的cookies
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})
Router.post('/update', (req, res) => {
  // 除了登录注册页所有的页面都需要查看发来的请求有没有携带cookie
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type,
      },
      body
    )
    return res.json({ code: 0, data })
  })
})
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body

  // 查找后，不要显示pwd给客户端，设为0
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    } else {
      // 在response里设置cookie
      res.cookie('userid', doc._id)
      return res.json({ code: 0, data: doc })
    }
  })
})
Router.post('/register', (req, res) => {
  console.log(req.body)
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    // md5加密密码
    User.create({ user, pwd: md5Pwd(pwd), type }, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '后端报错' })
      } else {
        res.cookie('userid', doc._id)
        return res.json({ code: 0, user, pwd: md5Pwd(pwd), type })
      }
    })
    //let ret = await User.create({user,pwd: md5Pwd(pwd), type })
  })
})
// User.remove({}, (err, data) => {
//   console.log(data)
// })
// 为了防止彩虹表，再一次加密，加入盐的概念,并两层md5
function md5Pwd(pwd) {
  const salt = 'whifjqwifqwdwj'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
