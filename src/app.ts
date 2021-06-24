const http = require('http')
import { IncomingMessage, ServerResponse } from "http"
import handleBlogRouter from "./router/blog"
import handleUserRouter from "./router/user"


export type ReqType = IncomingMessage & {path: string}

const server = http.createServer((req: ReqType, res: ServerResponse) => {

  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json')

  const { url } = req
  req.path = url.split('?')[0]

  // 处理 blog 路由
  const blogData = handleBlogRouter(req, res)
  if(blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return 
  }

  // 处理 user 路由
  const userData = handleUserRouter(req, res)
  if(userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // 未命中路由返回 404
  res.writeHead(404, {'Content-type': "text/plain"})
  res.write('404 Not Found\n')
  res.end()
})

server.listen(3000, () => {
  console.log('server in http://localhost:3000')
})