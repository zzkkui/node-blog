import BlogRouter from "./blog";
import UserRouter from "./user";

export default {
  blog: new BlogRouter(),
  user: new UserRouter()
};
