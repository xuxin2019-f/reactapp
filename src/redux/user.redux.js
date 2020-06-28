import axios from 'axios'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const initState = {
  isAuth: false,
  // 报错信息
  msg: '',
  user: '',
  pwd: '',
  type: '',
}
export const user = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, isAuth: true, ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

// action creator
export function errMsg(msg) {
  return { msg, type: 'ERROR_MSG' }
}
export function registerSuccess(data) {
  return { type: 'REGISTER_SUCCESS', payload: data }
}

// 异步请求
export function register({ user, pwd, repeatpwd, type }) {
  // 用户名和密码不能为空
  // 这两块不用dispatch，要直接return!
  if (!user && !pwd && !repeatpwd) {
    return errMsg('用户名和密码不能为空！')
  }
  if (pwd !== repeatpwd) {
    return errMsg('两次密码不一致！')
  }
  return (dispatch) => {
    axios.post('/user/register', { user, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        console.log(res)
        dispatch(registerSuccess({ user, pwd, type }))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
}
