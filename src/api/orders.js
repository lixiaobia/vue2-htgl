import request from '@/utils/request'
// 订单数据列表
export const ordersList = (params) => {
  return request({
    url: 'orders',
    params
  })
}
