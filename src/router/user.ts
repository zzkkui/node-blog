import { ServerResponse } from "http"
import { ReqType } from "../app"

const handleUserRouter = (req: ReqType, res: ServerResponse) => {
  const { method, path } = req

  if(method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是登录的接口'
    }
  }

}

export default handleUserRouter