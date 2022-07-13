import request from '@/utils/request'
// 商品列表数据
export const goodsList = (params) => {
  return request({
    url: 'goods',
    params
  })
}
// 删除商品
export const deleteGood = (id) => {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}
// 编辑提交商品
export const editGood = (data) => {
  return request({
    url: `goods/${data.id}`,
    method: 'put',
    data
  })
}
// 根据 ID 查询商品
export const getGoods = (id) => {
  return request({
    url: `goods/${id}`
  })
}
// 添加商品
export const addgoodsList = (params) => {
  return request({
    url: 'goods',
    method: 'post',
    params
  })
}
