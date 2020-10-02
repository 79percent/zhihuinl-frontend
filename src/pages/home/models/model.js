import {
  getArticles,
  getApplyjobs,
  getRecruits,
  getProductList,
} from '../services';
import { message } from 'antd'

const initState = {
  articleList: [],//文章
  applyjobList: [],//求职
  recruitList: [],//招工
  productList: [],//产品
};
const Model = {
  namespace: 'home',
  state: initState,
  effects: {
    *getArticles({ payload }, { call, put }) {
      const res = yield call(getArticles, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveArticles',
          payload: res.data.list,
        });
      } else {
        message.error(msg)
      }
      return res
    },
    *getApplyjobs({ payload }, { call, put }) {
      const res = yield call(getApplyjobs, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveApplyjobs',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
    *getRecruits({ payload }, { call, put }) {
      const res = yield call(getRecruits, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveRecruits',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
    *getProductList({ payload }, { call, put }) {
      const res = yield call(getProductList, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveProductList',
          payload: res.data.list,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
  },
  reducers: {
    saveArticles(state, { payload }) {
      return {
        ...state,
        articleList: payload
      };
    },
    saveApplyjobs(state, { payload }) {
      return {
        ...state,
        applyjobList: payload
      };
    },
    saveRecruits(state, { payload }) {
      return {
        ...state,
        recruitList: payload
      };
    },
    saveProductList(state, { payload }) {
      return {
        ...state,
        productList: payload
      };
    },
    clear() {
      return initState;
    },
  },
};
export default Model;
