import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import createError from "http-errors";
import { NextFunction, Response, Request } from "express";

@Middleware({ type: "after" })
class NotFoundMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    next(createError(404));
  }
}

export default NotFoundMiddleware;
