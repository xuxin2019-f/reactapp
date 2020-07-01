import axios from 'axios'
import { getRedirectPath } from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
  redirectTo: '',
  isAuth: false,
  // 报错信息
  msg: '',
  user: '',
  type: '',
}
export const user = (state = initState, action) => {
  switch (action.type) {
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload,
      }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case LOGOUT:
      return { ...state, redirectTo: '/login' }
    default:
      return state
  }
}

// action creator
export function errMsg(msg) {
  return { msg, type: ERROR_MSG }
}
// export function registerSuccess(data) {
//   return { type: 'AUTH_SUCCESS', payload: data }
// }
// export function loginSuccess(data) {
//   return { type: 'AUTH_SUCCESS', payload: data }
// }
export function authSuccess(obj) {
  const { pwd, ...data } = obj
  return { type: AUTH_SUCCESS, payload: data }
}
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}
export function logoutSubmit() {
  return { type: LOGOUT }
}

// 异步请求
export function update(data) {
  return (dispatch) => {
    axios.post('/user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('信息完善', res.data.data)
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
}
export function register({ user, pwd, repeatpwd, type }) {
  // 用户名和密码不能为空
  // 这两块不用dispatch，要直接return!
  if (!user || !pwd || !repeatpwd) {
    return errMsg('用户名和密码不能为空！')
  }
  if (pwd !== repeatpwd) {
    return errMsg('两次密码不一致！')
  }
  return (dispatch) => {
    axios.post('/user/register', { user, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('res', res)
        dispatch(authSuccess(res.data))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errMsg('用户名和密码不能为空！')
  }
  return (dispatch) => {
    axios.post('/user/login', { user, pwd }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
        console.log(res.data)
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
}
