import { ServerResponse } from "http"
import { ReqType } from "../app"

const handleBlogRouter = (req: ReqType, res: ServerResponse) => {
  const { method, path } = req

  if(method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口'
    }
  }

  if(method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情的接口'
    }
  }

  if(method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新增博客的接口'
    }
  }

  if(method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
    }
  }

  if(method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

export default handleBlogRouter