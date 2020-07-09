import React from 'react'
// import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
// const socket = io('ws://localhost:9093')
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'

@connect((state) => state, { getMsgList, sendMsg, recvMsg, readMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false,
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
  componentWillMount() {
    // 让后端把当前聊天页与我聊天的这个人发给我的信息的read表示为true已读
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  // 修复antd中宫格的bug
  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter((v) => v)
      .map((v) => ({ text: v }))
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
        <QueueAnim delay={100}>
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
        </QueueAnim>

        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              onChange={(v) => {
                this.setState({ text: v })
              }}
              value={this.state.text}
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji,
                      })
                      this.fixCarousel()
                    }}
                  >
                    😃
                  </span>
                  <span onClick={() => this.sendMsg()}>发送</span>
                </div>
              }
            ></InputItem>
            {this.state.showEmoji ? (
              <Grid
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(el) =>
                  this.setState({
                    text: this.state.text + el.text,
                  })
                }
              />
            ) : null}
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
