import request from '@/utils/request'
// 查询企业的部门列表
export function companyDepartment() {
  return request({
    url: '/company/department'
  })
}
// 添加部门
export function companyDepartmentPost(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
// 修改部门
export function companyDepartmentPut(data) {
  return request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
  })
}
// 删除部门
export function companyDepartmentDelete(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}