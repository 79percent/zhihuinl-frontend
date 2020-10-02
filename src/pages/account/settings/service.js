import request from '@/utils/request';
import url from '@/utils/domain';

//获取当前用户信息
export async function queryCurrent() {
  return request(`${url}/user/getCurrentUserInfo`);
}

//修改当前用户信息
export async function updateCurrentUserInfo(params) {
  return request(`${url}/user/updateCurrentUserInfo`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
