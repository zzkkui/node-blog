export type BlogDataType = {
  id: number;
  title: string;
  content: string;
  createTime: number;
  author: string;
};

export const getList = (author: string, keyword: string) => {
  const list: BlogDataType[] = [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1624531920099,
      author: "zzkkui",
    },
    {
      id: 2,
      title: "标题B",
      content: "内容N",
      createTime: 1624532103680,
      author: "zoey",
    },
  ];
  return list;
};

export const getDetail = (id: string) => {
  const detail = {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1624531920099,
    author: "zzkkui",
  };
  return detail;
};

export const newBlog = (blogData = {}) => {
  // 处理 blogData
  const detail = {
    id: 3,
    title: "标题C",
    content: "内容C",
    createTime: 1624613180813,
    author: "momo",
  };
  return detail;
};

export const updateBlog = (blogData = {}) => {
  // 处理 blogData
  const detail = {
    id: 3,
    title: "标题C",
    content: "内容C",
    createTime: 1624613180813,
    author: "momo",
  };
  return detail;
};

export const deleteBlog = (id: string) => {
  // 处理 blogData
  return true;
};
