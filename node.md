# Nodejs

 

## nodejs和js的区别

- 服务稳定性

  ```
  server端可能会遭受各种恶意攻击和误操作
  单个客户端可以意外挂掉，但是服务端不能
  PM2进程守候
  ```

- 考虑内存和cpu(优化， 扩展)

  ```
  客户端独占一个浏览器，内存和CPU都不是问题
  serve端要承载很多请求，CPU和内存都是稀缺资源
  ```

- 日志

  ```
  前端也会参与日志，但只是日志的发起方，不关心后续
  server端要记录日志、存储日志、分析日志、前端不关系
  ```

- 安全

  ```
  server端要随时准备接受各种恶意攻击，前端则少很多
  ```

- 集群和服务拆分

  ```
  产品发展速度块，流量可能迅速增加，拆分
  ```

  

## http请求概述

### 输入url后发生了什么

- DNS解析， 建立TCP链接，发送http 请求
- server接收到http请求，处理，并返回
- 客户端接收到返回数据， 处理数据（如渲染页面，执行js）



### nodejs处理http请求

- get请求 querystring 
- post 请求postdata
- 路由
