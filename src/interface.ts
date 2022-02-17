import express from "express";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
export type Param = "params" | "query" | "body" | "headers" | "cookies";
export type Parse = "number" | "string" | "boolean";

export interface ControllerType {
  path: string;
  target: Function;
}

export interface RouteType {
  target: object;
  name: string;
  type: HttpMethod;
  path: string;
  funcs: ((...args: any[]) => any)[];
  func: (...args: any[]) => any;
  loaded?: boolean;
}

export interface ParamType {
  key: string;
  index: number;
  type: Param;
  name: string;
}

export interface ParseType {
  type: Parse;
  index: number;
  name: string;
}

export interface SelfRequest {
  session: Record<string, any>;
}

export type MergeRequest = SelfRequest & express.Request;
