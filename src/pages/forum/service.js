import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取问题列表
export async function getQuestionList(params) {
  return request(`${url}/question/getQuestionList?${stringify(params)}`);
}

//发布问题
export async function addQuestion(params) {
  return request(`${url}/question/add`,{
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//获取问题详情
export async function getDetail(params) {
  return request(`${url}/question/getDetail?${stringify(params)}`);
}

//评论
export async function comment(params) {
  return request(`${url}/question/comment`,{
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//获取回复下面的子评论
export async function getChildComments(params) {
  return request(`${url}/question/getChildComments?${stringify(params)}`);
}