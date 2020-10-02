import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取信息列表
export async function getList(params) {
  return request(`${url}/recruit/getRecruitList?${stringify(params)}`);
}

//修改信息
export async function update(params) {
  return request(`${url}/recruit/updateRecruit`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//删除信息
export async function remove(params) {
  return request(`${url}/recruit/removeRecruit`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}