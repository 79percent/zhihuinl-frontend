import request from '@/utils/request';
import url from '@/utils/domain';
import { stringify } from 'qs';

//获取列表
export async function getQuestionList(params) {
  return request(`${url}/question/getQuestionList?${stringify(params)}`);
}

//删除
export async function remove(params) {
  return request(`${url}/question/remove`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}