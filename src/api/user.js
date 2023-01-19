import request from '@/utils/request'

// 登录
export function sysLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
    noToken: true
  })
}
// 获取用户信息
export function sysProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取员工基本信息
export function sysUser(id) {
  return request({
    url: '/sys/user/' + id
  })
}
