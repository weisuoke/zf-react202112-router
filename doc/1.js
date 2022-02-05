let path = '/post/:id/:age'

let pathname = '/post/100/200'

function compilePath(path) {
  let paramNames = []
  let regexpSource = "^" + path.replace(/:(\w+)/g, (_, key) => {
    paramNames.push(key);
    return "([^\\/]+)"
  });
  regexpSource += '$';
  let matcher = new RegExp(regexpSource)
  return [matcher, paramNames]
}

let [matcher, paramNames] = compilePath(path)

console.log(matcher)
console.log(paramNames)
let match = pathname.match(matcher)
console.log(match)
let values = match.slice(1)
let params = paramNames.reduce((memo, paramNames, index) => {
  memo[paramNames] = values[index]
  return memo
}, {})
console.log(params)