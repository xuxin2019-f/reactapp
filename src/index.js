import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, applyMiddleware(thunk))

// boss genius me msg 4个页面
ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
