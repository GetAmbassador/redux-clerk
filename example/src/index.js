import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
