import request from '@/utils/request'

//1、查询系统logo
export function queryLogo(data) {
    return request({
        url: 'logo/queryLogo',
        method: 'post',
        data: data
    })
}
