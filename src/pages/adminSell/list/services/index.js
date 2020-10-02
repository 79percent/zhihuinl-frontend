import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取产品列表
export async function getProductList(params) {
  return request(`${url}/sell/getProductList?${stringify(params)}`);
}

//修改
export async function updateProduct(params) {
  return request(`${url}/sell/updateProduct`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//删除
export async function removeProduct(params) {
  return request(`${url}/sell/removeProduct`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}