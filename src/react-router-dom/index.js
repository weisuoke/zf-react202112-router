import React from 'react'
import { Router, useNavigate, useLocation } from "../react-router";
import { createBrowserHistory, createHashHistory } from "../history";
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
    history.listen(({location, action}) => {
      setState({location, action})
    })
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

export function Link({to, ...rest}) {
  let navigator = useNavigate() // navigate history
  function handleClick(event) {
    event.preventDefault();
    navigator(to)
  }
  return (
    <a {...rest} href={to} onClick={handleClick} />
  )
}

export function NavLink({
  className: classNameProp = '',  // 类名,可能是一个字符串，也可能是一个函数
  end = false,  // 是否结束
  style: styleProp = {},  // 样式，可能是一个对象也可以时一个函数
  to, // 跳转到哪里
  children, // 儿子
  ...rest
}) {
  let location = useLocation();
  // 当前地址栏中的实际路径
  let pathname = location.pathname
  // 要匹配的路径
  let path = {pathname: to}
  let toPathname = path.pathname;
  let isActive = pathname === to
    || (!end && pathname.startsWith(to) && pathname.charAt(to.length) === '/')
  let className
  if (typeof classNameProp === 'function') {
    className = classNameProp({ isActive })
  } else {
    className = classNameProp;
  }
  let style = typeof styleProp === 'function' ? styleProp({ isActive }) : styleProp;
  return (
    <Link {...rest} className={className} style={style} to={to}>{children}</Link>
  )
}