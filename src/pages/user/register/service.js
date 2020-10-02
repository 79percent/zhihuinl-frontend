import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//注册
export async function register(params) {
  return request(`${url}/user/register`, {
    method: 'POST',
    data: JSON.stringify(params),
  });
}