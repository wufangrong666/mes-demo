import request from '@/utils/request'

/**
 *
 * @param {*} data
 */
export function usersList(data) {
  return request({
    url: 'system/user/queryUserList',
    method: 'post',
    data: data
  })
}

/**
 * type
 * @param {*} data
 */
export function depList(data) {
  return request({
    url: 'system/dept/queryDeptTree',
    method: 'post',
    data: data
  })
}

export function getUserByDeptId(data) {
  return request({
    url: 'system/user/queryUserByDeptId',
    method: 'post',
    data: data
  })
}


// 部门下的员工
export function userListByStructid(data) {
  return request({
    url: 'admin/users/userListByStructid',
    method: 'post',
    data: data
  })
}

// 权限数据返回
export function adminIndexAuthList(data) {
  return request({
    url: 'system/role/auth',
    method: 'post',
    data: data
  })
}