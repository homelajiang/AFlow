Pink DB Design 
==============

## 用户系统
### 1. oath （用户认证信息）
`_id` 主键

`token_type` String 令牌类型 默认：bearer

`expires_in` Number 令牌过期时间，单位为秒

`scope` String 权限范围 默认：0

`expires_date` Date 开始时间

`access_token` String 访问令牌

`refresh_token` String N 更新令牌，用来下一次获取令牌

`username` String 用户名

`password` String 用户密码

`roleId` ObjectId 用户角色id

`uid` ObjectId 用户资料id,关联用户资料

## 2. profile (用户资料)

`_id`

`nickname`

`userImg`

`email`

`gender`

`signature`

`confirmed`

`lastLoginDate`

`joinDate`

`mobile`

`exp`

`level`

`time`

## role(用户角色信息)
`_id`

`roleName` 角色名称

## limit(角色权限信息)
`_id`

`roleId` 角色id

`limit` Array 权限列表 默认:[]

## attach（附件信息）
`_id`

`fileName` String 文件名

`filePath` String 文件存储路径

`fileType` String 文件类型

`creator` ObjectId 文件创建者ID

`createDate` Date 文件创建时间

`delFlag` boolean 文件是否被删除

## post（文档内容）
`_id`

`profileId`

`tagId`

`catergorieId`

`title`

`content`

`categories`

`createTime`

`lastModifyTime`

`delFlag`

## tag（标签）
`_id` 

`tagName` String 标签名字

## categories（分类）
`_id` 

`categorieName` String 分类名字

## comment(文档评论)
`_id`

`content`

`postId` 

`profileId`

`createTime`

`delFlag`
