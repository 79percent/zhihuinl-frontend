import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取求职信息列表
export async function getApplyjobs() {
  return request(`${url}/applyjob/getApplyjobs`);
}

//获取求职信息详情
export async function getApplyjobDetail(params) {
  return request(`${url}/applyjob/getApplyjobDetail?${stringify(params)}`);
}

//发布求职信息
export async function addApplyjob(params) {
  return request(`${url}/applyjob/addApplyjob`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//删除求职信息
export async function removeApplyjob(params) {
  return request(`${url}/applyjob/removeApplyjob`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//修改求职信息
export async function updateApplyjob(params) {
  return request(`${url}/applyjob/updateApplyjob`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}