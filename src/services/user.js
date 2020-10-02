import request from '@/utils/request';
import url from '@/utils/domain';

export async function query() {
  return request('/api/users');
}

//获取当前用户信息
export async function queryCurrent() {
  return request(`${url}/user/getCurrentUserInfo`);
}

//获取消息
export async function queryNotices() {
  return request('/api/notices');
}
