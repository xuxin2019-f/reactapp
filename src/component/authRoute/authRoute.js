import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

export default
@withRouter
class AuthRoute extends React.Component {
  async componentDidMount() {
    // 登录页和注册页不需要获取用户信息，也不需要跳转
    const publicRoute = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicRoute.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    let res = await axios.get('/user/info')
    if (res.status === 200) {
      console.log(res.data)
      if (res.data.code === 0) {
        // 有登录信息
      } else {
        // 由于该组件不是一个Route，所以要用到一个插件withRouter来提供路由相关方法
        console.log(this.props.history)
        this.props.history.push('/login')
      }
    }
    // 判断是否登录
    // 用户信息没完善就要选择头像，完善个人信息
    // 查看现在url地址，如果是login不需要跳转
    // 查看用户的type，身份是boss还是牛人
  }
  render() {
    return <div></div>
  }
}
