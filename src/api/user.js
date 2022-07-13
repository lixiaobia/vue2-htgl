import request from '@/utils/request'

// 登录接口
export const login = ({ username, password }) => {
  return request({
    method: 'post',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
// 菜单权限menus
export const menus = () => {
  return request({
    url: 'menus'
  })
}
// 用户数据列表
export const usersList = (params) => {
  return request({
    url: 'users',
    params
  })
}
// 修改用户状态
export const usersstate = (data) => {
  return request({
    url: `users/${data.uId}/state/${data.type}`,
    method: 'put',
    data
  })
}
// 添加用户
export const addusers = (data) => {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}
// 删除单个用户
export const deleteusers = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'

  })
}
// 根据 ID 查询用户信息users/:id
export const getusers = (id) => {
  return request({
    url: `users/${id}`
  })
}
// 编辑用户提交
export const editusers = (data) => {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
// 分配用户角色
export const usersrole = (data) => {
  return request({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
