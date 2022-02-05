/**
 * 一个 Router 用在浏览器端，提供最干净的URL
 * @param ref
 * @constructor
 */
function BrowserRouter(ref) {

}

/**
 * 一个用在浏览器的 Router
 * 把路径保存在 URL 地址的 hash 部分，以便在改变的时候不会发送给服务器
 * @param ref
 * @constructor
 */
function HashRouter(ref) {

}

export {
  BrowserRouter,
  HashRouter
}