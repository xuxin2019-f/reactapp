import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    // 指定接收的selectAvatar属性类型必须是函数类型
    selectAvatar: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map((v) => ({
        icon: require(`../images/${v}.png`),
        text: `${v}`,
      }))
    const gridHeader = this.state.text ? (
      <div>
        <span>已选择头像</span>
        <img style={{ width: 20 }} src={this.state.icon} />
      </div>
    ) : (
      '请选择头像'
    )
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          {/* 宫格 */}
          <Grid
            data={avatarList}
            activeStyle={false}
            columnNum={5}
            onClick={(elm) => {
              this.setState(elm)
              // 父组件传递的函数
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}
export default AvatarSelector
