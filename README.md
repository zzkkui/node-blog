## node 博客系统

### ngnix 配置

```js
server {
  //***
  // 浏览器打开 8080 端口
    listen       8080;
    server_name  localhost;

  // 静态文件代理地址
  // 静态服务地址为 8001
    location / {
        proxy_pass http://localhost:8001;
    }

  // api 代理地址
  // 所以 node 服务端口为 8000
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
  //***
}
```
