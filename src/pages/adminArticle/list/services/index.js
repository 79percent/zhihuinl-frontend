import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取产品列表
export async function getArticles(params) {
  return request(`${url}/article/getArticles?${stringify(params)}`);
}

//发布
export async function addArticle(params) {
  return request(`${url}/article/addArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//修改
export async function updateArticle(params) {
  return request(`${url}/article/updateArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

//删除
export async function removeArticle(params) {
  return request(`${url}/article/removeArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}