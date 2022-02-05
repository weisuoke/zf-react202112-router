import React from 'react'
const NavigationContext = React.createContext();
const LocationContext = React.createContext();
const RouteContext = React.createContext();

/**
 * 路由容器
 * @param children 儿子
 * @param navigator 历史对象，其实就是 history
 * @param location 地址对象，{pathname: '地址路径'}
 * @returns {JSX.Element}
 * @constructor
 */
function Router({children, navigator, location}) {
  return (
    <NavigationContext.Provider value={{navigator}}>
      <LocationContext.Provider value={{location}}>
        {children}
      </LocationContext.Provider>
    </NavigationContext.Provider>
  )
}

function useLocation() {
  return React.useContext(LocationContext).location
}

function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children))
}

function useRoutes(routes) {
  let location = useLocation()
  let pathname = location.pathname || '/'
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    let match = matchPath(path, pathname)
    if (match) {
      return element
    }
  }
}

/**
 * 判断此route对应的path路径和地址中的pathname是否匹配
 * @param path
 * @param pathname
 */
function matchPath(path, pathname) {
  let matcher = compilePath(path);
  let match = pathname.match(matcher)
  return match
}

/**
 * 把路径转化成正则表达式
 * @param path 路径
 */
function compilePath(path) {
  let regexpSource = "^" + path;
  regexpSource += '$';
  let matcher = new RegExp(regexpSource)
  return matcher
}

function createRoutesFromChildren(children) {
  let routes = [];
  React.Children.forEach(children, child => {
    let route = {
      path: child.props.path, // 代表 Route 的路径
      element: child.props.element  // 代表此 Route 要渲染的元素
    }
    routes.push(route);
  })
  return routes
}

function Route(props) {

}

export {Router, Routes, Route}