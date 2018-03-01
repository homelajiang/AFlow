Pink RESTful API Doc 
====================

> ## 声明：
> 1·接口基于RESTful设计风格，接口文档格式基于Markdown语法，协议使用HTTP/1.1（特殊情况除外）
>
> 2.接口地址统一采用：```http://域名/api/版本/请求资源?过滤参数```，
> 例如：```http://192.168.0.111/api/v1/users?limit=10&offset=10```

3.响应内容默认以JSON格式返回

4.服务器返回标准的状态码，状态码详细信息参照[这里](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
。如果状态码是4xx,向用户返回出错信息，键值为```msg```。

## 1.用户相关
* 登录（获取/刷新 TOKEN）
   
  ```POST api/v1/login```
* 注册

  ```POST api/v1/join```
* 重置密码

   ```POST api/v1/reset```
* 获取用户信息

   ```GET api/v1/users/{userId}```
* 修改用户信息

  ```PUT api/v1/users/{userId}```
## 2.api管理系统
## 3.博客系统
## 4.智能管理系统
### 4.1天气
* 根据时间、天气、控件信息获取图片

  ```GET api/v1/weather/img/{resourceName}/{weatherCode}/{timeStamp}```
  
  
### 4.2日程
* 获取日程列表

  ```GET api/v1/users/{userId}/calendar```
* 获取日程详细信息

  ```GET api/v1/users/{userId}/calendar/{calendarId}```
* 添加日程信息

  ```POST api/v1/users/{userId}/calendar```
* 修改日程信息

  ```PUT api/v1/users/{userId}/calendar/{calendarId}```
* 删除日程信息

  ```DELETE api/v1/users/{userId}/calendar/{calendarId}```
* 同步日程信息

  ```todo```
  
  
### 4.3 新闻
* 获取新闻列表

  ```GET api/v1/users/{userId}/news```
* 获取新闻详细信息

  ```GET api/v1/news/{newsId}```
* 获取感兴趣的新闻标签列表

  ```GET api/v1/users/{userId}/newsTag```
* 修改感兴趣的新闻标签列表

  ```PUT api/v1/users/{userId}/newsTag```
* 查询不感兴趣的网站列表

  ```GET api/v1/users/{userId}/newsBlackSite```
* 添加不感兴趣的网站列表

  ```POST api/v1/users/{userId}/newsBlackSite```
* 删除不感兴趣的网站列表

  ```DELETE api/v1/users/{userId}/newsBlackSite/{siteId}```

### 4.4 设备数据采集
* 获取用户的设备列表

  ```GET api/v1/users/{userId}/device```
* 获取设备详细信息

  ```GET api/v1/users/{userId}/device/{deviceId}```
* 添加设备

  ```POST api/v1/users/{userId}/device```
* 删除设备

  ```DELETE api/v1/users/{userId}/device/{deviceId}```
* 修改设备信息

  ```PUT api/v1/users/{userId}/device/{deviceId}```
* 查询设备对应的传感器列表

  ```GET api/v1/users/{userId}/device/{deviceId}/sensor```
* 查询传感器详细信息

  ```GET api/v1/users/{userId}/device/{deviceId}/sensor/{sensorId}```
* 添加传感器

  ```POST api/v1/users/{userId}/device/{deviceId}/sensor```
* 删除传感器

  ```DELETE api/v1/users/{userId}/device/{deviceId}/sensor/{sensorId}```
* 修改传感器信息

  ```PUT api/v1/users/{userId}/device/{deviceId}/sensor/{sensorId}```
* *和传感器交互*

### 4.5位置信息采集
* 上传位置信息列表

  ```POST api/v1/users/{userId}/location```


返回状态码说明
===========
状态码	| 含义 | 说明
------|------|----
200	 | OK | 请求成功
201 | CREATED | 创建成功
202 | ACCEPTED | 更新成功
400 | BAD REQUEST | 请求的地址不存在或者包含不支持的参数
401 | UNAUTHORIZED | 未授权
403 | FORBIDDEN | 被禁止访问
404 | NOT FOUND | 请求的资源不存在
500 | INTERNAL SERVER ERROR | 内部错误