import { ErrorModel } from "@src/modules/resModle";

export default (req: any, res: any, next: any) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModel("未登录"));
};
