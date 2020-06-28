const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/reactapp'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    'type:': { type: String, require: true },
    // 头像 通过头像、简介等的存在判断是不是完善个人信息了
    avatar: { type: String },
    // 个人简介或职位简介
    desc: { type: String },
    title: { type: String },
    // 如果是boss，还有两个字段
    company: { type: String },
    money: { type: String },
  },
  // 聊天
  chat: {},
}

// 批量动态生成
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  },
}
