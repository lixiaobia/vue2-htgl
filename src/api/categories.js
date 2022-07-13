import request from '@/utils/request'
// 商品分类数据列表
export const categories = (params) => {
  return request({
    url: 'categories',
    params
  })
}
// 删除分类
export const deleteCategorie = (id) => {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}
// 根据 id 查询分类
export const updateCategorie = (id) => {
  return request({
    url: `categories/${id}`
  })
}
// 编辑提交分类
export const editCategorie = ({ id, catname }) => {
  return request({
    url: `categories/${id}`,
    method: 'put',
    data: {
      cat_name: catname
    }
  })
}
// 添加分类
export const addCategorie = (data) => {
  return request({
    url: 'categories',
    method: 'post',
    data
  })
}
