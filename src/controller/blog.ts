import { exec, escape } from "@src/db/mysql";
import { filterXSS } from "xss";

export type BlogDataType = {
  id?: number;
  title: string;
  content: string;
  createTime: number;
  updateTime: number;
  author: string;
};

export const getList = (author: string, keyword: string) => {
  author = escape(author);
  keyword = filterXSS(keyword);
  // where 1=1 占位，防止后面格式错误
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql = `${sql} and author=${author}`;
  }
  if (keyword) {
    sql = `${sql} and title like '%${keyword}%'`;
  }
  sql = `${sql} order by createtime desc;`;
  return exec(sql);
};

export const getDetail = (id: string) => {
  const sql = `select * from blogs where id=${id}`;
  return exec(sql);
};

export const newBlog = (blogData: Partial<BlogDataType> = {}) => {
  let { title, content, author } = blogData;
  title = escape(filterXSS(title));
  content = escape(filterXSS(content));
  author = escape(author);

  const sql = `insert into blogs(title, content, author, createtime, updatetime)
  values(${title}, ${content}, ${author}, ${Date.now()}, ${Date.now()})`;
  return exec(sql);
};

export const updateBlog = (blogData: BlogDataType) => {
  let { title, content, author } = blogData;
  const { id } = blogData;
  title = escape(filterXSS(title));
  content = escape(filterXSS(content));
  author = escape(author);

  const sql = `update blogs set title=${title}, content=${content}, updatetime=${Date.now()} where id=${id} and author=${author};`;
  return exec(sql);
};

export const deleteBlog = (blogData: BlogDataType) => {
  const { id } = blogData;
  let { author } = blogData;
  author = escape(author);

  const sql = `delete from blogs where id=${id} and author=${author}`;
  return exec(sql);
};
