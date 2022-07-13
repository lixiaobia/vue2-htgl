import request from '@/utils/request'
export const categoriesList = (params) => {
  return request({
    url: `categories/${params.id}/attributes`,
    params
  })
}
