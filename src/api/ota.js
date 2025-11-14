import request from '../utils/request'

export const upload = (data) => {
	return request({
		url: '/api/v1/host/file/upload',
		method: 'post',
		data,
	})
}
export const fetchOTAList = (params) => {
	return request({
		url: '/api/v1/host/admin/ota/list',
		method: 'get',
		params,
	})
}
export const deploy = (data) => {
	return request({
		url: '/api/v1/host/admin/ota/deploy',
		method: 'post',
		data,
	})
}
