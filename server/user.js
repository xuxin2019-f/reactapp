// 用户的接口
const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})
Router.get('/info', (req, res) => {
  res.json({ code: 0 })
})
Router.post('/register', (req, res) => {
  console.log(req.body)
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, pwd, type }, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '后端报错' })
      } else {
        return res.json({ code: 0 })
      }
    })
  })
})
module.exports = Router
