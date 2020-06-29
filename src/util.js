// 存放工具
export function getRedirectPath({ type, avatar }) {
  //根据用户信息返回不同的跳转地址
  // user.type/boss/genius
  // user.avatar/bossinfo/geniusinfo
  let url = type === 'boss' ? '/boss' : '/genuis'
  if (!avatar) {
    url += 'info'
  }
  return url
}
