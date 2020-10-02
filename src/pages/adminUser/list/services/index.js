import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取用户列表
export async function getUserList(params) {
  return request(`${url}/user/getUserList?${stringify(params)}`);
}

//修改用户信息
export async function updateCurrentUserInfo(params) {
  return request(`${url}/user/updateCurrentUserInfo`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//删除用户
export async function removeUser(params) {
  return request(`${url}/user/removeUser`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}