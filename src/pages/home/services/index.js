import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取文章列表
export async function getArticles(params) {
  return request(`${url}/article/getArticles?${stringify(params)}`);
}

//获取求职信息列表
export async function getApplyjobs() {
  return request(`${url}/applyjob/getApplyjobs`);
}

//获取招工信息列表
export async function getRecruits() {
  return request(`${url}/recruit/getRecruits`);
}

//获取产品列表
export async function getProductList(params) {
  return request(`${url}/sell/getProductList?${stringify(params)}`);
}