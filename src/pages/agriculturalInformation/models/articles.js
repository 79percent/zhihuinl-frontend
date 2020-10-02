import {
  getArticles,
  getArticleDetail,
  addArticle,
  removeArticle,
  updateArticle,
} from '../services';
import { message } from 'antd'

const Model = {
  namespace: 'articles',
  state: {
    keyword: '',
    list: [],
    pagination: {
      total: 0,
      totalPage: 0,
      currentPage: 1,
      pageSize: 3,
    }
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
  },
  reducers: {
    saveList(state, action) {
      const { list, ...pagination } = action.payload
      return { ...state, list: state.list.concat(list), pagination };
    },
    saveKeyWord(state, action) {
      return { ...state, keyword: action.payload };
    },
    initList(state, action) {
      return {
        ...state,
        list: [],
      };
    },
    initListAndPagination(state, action) {
      return {
        ...state,
        list: [],
        pagination: {
          total: 0,
          totalPage: 0,
          currentPage: 1,
          pageSize: 3,
        }
      };
    },
    initState(state, action) {
      return {
        keyword: '',
        list: [],
        pagination: {
          total: 0,
          totalPage: 0,
          currentPage: 1,
          pageSize: 3,
        }
      };
    },
  },
};
export default Model;
