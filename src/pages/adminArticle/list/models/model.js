import {
  getArticles,
  updateArticle,
  removeArticle
} from '../services';
import { message } from 'antd';

const initState = {
  filterValues: {
    keyword: null,
  },
  list: [],
  pagination: {
    total: 0,
    totalPage: 0,
    currentPage: 1,
    pageSize: 10,
  }
}

const Model = {
  namespace: 'adminArticle',
  state: {
    ...initState
  },
  effects: {
    *getArticles({ payload }, { call, put }) {
      const res = yield call(getArticles, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveList',
          payload: res.data,
        });
      } else {
        message.error(msg)
      }
      return res
    },
    *updateArticle({ payload }, { call, put }) {
      const res = yield call(updateArticle, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *removeArticle({ payload }, { call, put }) {
      const res = yield call(removeArticle, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
  },
  reducers: {
    saveList(state, action) {
      const { list, ...pagination } = action.payload
      return { ...state, list: list, pagination };
    },
    initState(state, action) {
      return {
        ...initState
      };
    },
    saveFilterValues(state, action) {
      return {
        ...state,
        filterValues: {...action.payload}
      };
    },
  },
};
export default Model;
