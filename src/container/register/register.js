import React from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio,
} from 'antd-mobile'

@connect((state) => state.user, { register })
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: '',
    }
    this.register = this.register.bind(this)
  }
  register() {
    // console.log(this.state)
    this.props.register(this.state)
  }
  change(key, value) {
    this.setState({
      // 注意传来的key是字符串类型的，要用[]
      [key]: value,
    })
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.msg ? <p>{this.props.msg}</p> : null}
          <List>
            <InputItem onChange={(v) => this.change('user', v)}>
              用户名：
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={(v) => this.change('pwd', v)} type="password">
              密码：
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(v) => this.change('repeatpwd', v)}
              type="password"
            >
              确认密码：
            </InputItem>
            <WhiteSpace />
            <RadioItem
              onChange={() => this.change('type', 'boss')}
              checked={this.state.type === 'boss'}
            >
              BOSS
            </RadioItem>
            <WhiteSpace />
            <RadioItem
              onChange={() => this.change('type', 'genius')}
              checked={this.state.type === 'genius'}
            >
              Worker
            </RadioItem>
            <WhiteSpace />
            <Button onClick={this.register} type="primary">
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Register
