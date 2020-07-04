import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect((state) => state)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    // 聊天列表
    const msgGroup = {}
    this.props.chat.chatmsg.forEach((v) => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 用sort进行排序，比较拿到每串聊天记录的最后的时间戳，将最新的时间戳排序到消息列表的最前面
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        {chatList.map((v) => {
          console.log(v)
          const lastItem = this.getLast(v)
          // 显示聊天记录的用户名：如果from是当前用户，则显示的用户名应该是to，反之显示from
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          // 在消息页的每条消息记录右边显示未读消息个数，过滤出未读的消息并且to是当前用户的信息
          const unreadNum = v.filter((v) => !v.read && v.to === userid).length
          if (!userinfo[targetId]) {
            return null
          }
          return (
            <List key={lastItem._id}>
              <Item
                // 显示未读消息数量
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                arrow="horizontal"
                // 跳转到详细聊天页面
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{userinfo[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}
export default Msg
