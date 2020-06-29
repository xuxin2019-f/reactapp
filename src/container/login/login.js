import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect((state) => state.user, { login })
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
    }
    // 避免直接用箭头函数，每次刷新都是新的函数，性能优化
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }
  change(key, value) {
    this.setState({
      // 注意传来的key是字符串类型的，要用[]
      [key]: value,
    })
  }
  register() {
    this.props.history.push('/register')
  }
  login() {
    this.props.login(this.state)
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h1>登录页</h1>
        <WingBlank>
          <List>
            {this.props.msg ? <p>{this.props.msg}</p> : null}
            <InputItem onChange={(v) => this.change('user', v)}>
              用户名：
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={(v) => this.change('pwd', v)}>
              密码：
            </InputItem>
          </List>
          <Button type="primary" onClick={this.login}>
            登录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login
