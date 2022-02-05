import React from 'react'
import { Router } from "../react-router";
import { createBrowserHistory, createHashHistory } from "history";
export * from '../react-router'

/**
 * 一个 Router 用在浏览器端，提供最干净的URL
 * @param ref
 * @constructor
 */
function BrowserRouter({children}) {
  let historyRef = React.useRef(null)
  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory()
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location
  })
  React.useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  )
}

/**
 * 一个用在浏览器的 Router
 * 把路径保存在 URL 地址的 hash 部分，以便在改变的时候不会发送给服务器
 * @param children
 * @constructor
 */
function HashRouter({ children }) {
  let historyRef = React.useRef(null)
  if (historyRef.current === null) {
    historyRef.current = createHashHistory()
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location
  })
  React.useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  )
}

export {
  BrowserRouter,
  HashRouter
}