import { NextFunction, Response, Request } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware
} from "routing-controllers";
import StatusCodes from "http-status-codes";

const { BAD_REQUEST } = StatusCodes;

@Middleware({ type: "after" })
class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(err: Error, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}

export default ErrorHandler;
