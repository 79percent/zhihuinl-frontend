import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取产品列表
export async function getProductList(params) {
  return request(`${url}/sell/getProductList?${stringify(params)}`);
}

//获取产品详情
export async function getProductDetail(params) {
  return request(`${url}/sell/getProductDetail?${stringify(params)}`);
}
