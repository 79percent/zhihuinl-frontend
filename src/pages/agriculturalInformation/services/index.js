import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取文章列表
export async function getArticles(params) {
  return request(`${url}/article/getArticles?${stringify(params)}`);
}

//获取文章详情
export async function getArticleDetail(params) {
  return request(`${url}/article/getArticleDetail?${stringify(params)}`);
}

//发布文章
export async function addArticle(params) {
  return request(`${url}/article/addArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//删除文章
export async function removeArticle(params) {
  return request(`${url}/article/removeArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//修改文章
export async function updateArticle(params) {
  return request(`${url}/article/updateArticle`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}