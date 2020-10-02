import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取招工信息列表
export async function getRecruits() {
  return request(`${url}/recruit/getRecruits`);
}

//获取招工信息详情
export async function getRecruitDetail(params) {
  return request(`${url}/recruit/getRecruitDetail?${stringify(params)}`);
}

//发布招工信息
export async function addRecruit(params) {
  return request(`${url}/recruit/addRecruit`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//删除招工信息
export async function removeRecruit(params) {
  return request(`${url}/recruit/removeRecruit`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//修改招工信息
export async function updateRecruit(params) {
  return request(`${url}/recruit/updateRecruit`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}