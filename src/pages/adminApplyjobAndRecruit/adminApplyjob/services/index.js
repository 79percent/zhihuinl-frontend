import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取信息列表
export async function getApplyjobList(params) {
  return request(`${url}/applyjob/getApplyjobList?${stringify(params)}`);
}

//修改信息
export async function updateApplyjob(params) {
  return request(`${url}/applyjob/updateApplyjob`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//删除信息
export async function removeApplyjob(params) {
  return request(`${url}/applyjob/removeApplyjob`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}