// 合并所有reducer并返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
export default combineReducers({ user })
