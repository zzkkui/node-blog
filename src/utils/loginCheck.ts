import { ReqType } from "@src/app";
import { ErrorModel } from "@src/model/resModel";

const loginCheck = (req: ReqType) => {
  const { session } = req;
  if (!session.username) {
    return new ErrorModel("尚未登录");
  }
};

export { loginCheck };
