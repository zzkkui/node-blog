import { HttpMethod, Param, Parse } from "@src/interface";

export const CONTROLLER_METADATA = "controller";
export const ROUTE_METADATA = "method";
export const PARAM_METADATA = "param";
export const PARSE_METADATA = "parse";

export function Controller(path = "/") {
  return (target: Function) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target);
  };
}

export function createMethodDecorator(method: HttpMethod = "get") {
  return (path = "/", ...funcs: Function[]): MethodDecorator =>
    (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      //
      Reflect.defineMetadata(
        ROUTE_METADATA,
        {
          path,
          type: method,
          funcs: funcs
        },
        descriptor.value
      );
    };
}

export function createParamDecorator(type: Param) {
  return (key?: string): ParameterDecorator =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    (target, name, index) => {
      // 多个参数
      const preMetadata =
        Reflect.getMetadata(PARAM_METADATA, target, name) || [];
      const newMetadata = [{ key, index, type }, ...preMetadata];

      Reflect.defineMetadata(PARAM_METADATA, newMetadata, target, name);
    };
}

export function Parse(type: Parse): ParameterDecorator {
  return (target, name, index) => {
    Reflect.defineMetadata(PARSE_METADATA, { type, index }, target, name);
  };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");
export const Body = createParamDecorator("body");
export const Headers = createParamDecorator("headers");
export const Cookies = createParamDecorator("cookies");
export const Query = createParamDecorator("query");
export const PathParam = createParamDecorator("params");
