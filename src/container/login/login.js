import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    // 避免直接用箭头函数，每次刷新都是新的函数，性能优化
    this.register = this.register.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        <Logo />
        <h1>登录页</h1>
        <WingBlank>
          <List>
            <InputItem>用户名：</InputItem>
            <WhiteSpace />
            <InputItem>密码：</InputItem>
          </List>
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}
