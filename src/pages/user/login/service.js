import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//登录
export async function login(params) {
  return request(`${url}/user/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//注册
export async function register(params) {
  return request(`${url}/user/register`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//获取当前用户信息
export async function getCurrentUserInfo() {
  return request(`${url}/user/getCurrentUserInfo`);
}

//修改当前用户信息
export async function updateCurrentUserInfo(params) {
  return request(`${url}/user/updateCurrentUserInfo`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
