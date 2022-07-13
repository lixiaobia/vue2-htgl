import request from '@/utils/request'
// 角色列表
export const rolesList = () => {
  return request({
    url: 'roles'
  })
}
// 添加角色
export const addRoles = (data) => {
  return request({
    url: 'roles',
    method: 'post',
    data
  })
}
// 删除角色
// 请求路径：roles/:id
export const deleteRoles = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}
// 根据 ID 查询角色
export const updateRoles = (id) => {
  return request({
    url: `roles/${id}`
  })
}
// 编辑提交角色
export const editRoles = ({ id, roleName, roleDesc }) => {
  return request({
    url: `roles/${id}`,
    method: 'put',
    data: {
      roleName,
      roleDesc
    }
  })
}
// 角色授权
export const rightsRoles = (data) => {
  return request({
    url: `roles/${data.roleId}/rights`,
    method: 'post',
    data
  })
}
// 删除角色指定权限
export const deletePermissions = ({ roleId, rightId }) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
