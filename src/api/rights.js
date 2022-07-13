import request from '@/utils/request'
// 所有权限列表
export const rightsList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
