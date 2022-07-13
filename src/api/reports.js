import request from '@/utils/request'
// 订单数据列表
export const reportsType = () => {
  return request({
    url: 'reports/type/1'

  })
}
