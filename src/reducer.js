// 合并所有reducer并返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
import { chatuser } from './redux/chatuser.redux'
export default combineReducers({ user, chatuser })
