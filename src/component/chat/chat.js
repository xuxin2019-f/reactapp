import React from 'react'
// import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
// const socket = io('ws://localhost:9093')
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect((state) => state, { getMsgList, sendMsg, recvMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
    }
  }
  sendMsg() {
    //socket.emit('sendMsg', { text: this.state.text })
    // 来自
    const from = this.props.user._id
    // 发给谁
    const to = this.props.match.params.user
    // 发送的消息
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: '',
    })
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    console.log('users', this.props.chat.users)
    const userid = this.props.match.params.user
    const user = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    // 引入util里的共用方法
    const chatid = getChatId(userid, this.props.user._id)
    // 过滤，只显示符合唯一chatid的
    const chatmsgs = this.props.chat.chatmsg.filter((v) => v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {/* 分你和我来左右显示 */}
        {chatmsgs.map((v) => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === user ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={<img src={avatar} alt="" />} className="chat-me">
                {v.content}
              </Item>
            </List>
          )
        })}

        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              onChange={(v) => {
                this.setState({ text: v })
              }}
              value={this.state.text}
              extra={<div onClick={() => this.sendMsg()}>发送</div>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
