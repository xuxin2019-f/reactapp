import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './config'
import reducers from './reducer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniuinfo/geniuinfo'

const store = createStore(reducers, applyMiddleware(thunk))

function Boss() {
  return <h1>BOSS页</h1>
}
function Genius() {
  return <h1>牛人页</h1>
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          {/* boss注册后完善信息的页面 */}
          <Route path="/bossinfo" component={BossInfo} />
          {/* 求职者注册后完善信息的页面 */}
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/boss" component={Boss} />
          <Route path="/genius" component={Genius} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
