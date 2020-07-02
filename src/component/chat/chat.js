import React from 'react'
// import io from 'socket.io-client'
import { List, InputItem, NavBar } from 'antd-mobile'
// const socket = io('ws://localhost:9093')
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

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
    this.props.getMsgList()
    this.props.recvMsg()
    // socket.on('recvMsg', (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text],
    //   })
    //   console.log(this.state.msg)
    // })
  }
  render() {
    console.log(this.props)
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id="chat-page">
        <NavBar mode="dark">{this.props.match.params.user}</NavBar>
        {/* <h2>{`chat with: ${this.props.match.params.user}`}</h2> */}

        {/* 分你和我来左右显示 */}
        {this.props.chat.chatmsg.map((v) => {
          return v.from === user ? (
            <List key={v._id}>
              <Item thumb={''}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={'avatar'} className="chat-me">
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
