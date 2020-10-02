/**
 * 滞销求购的model
 */
import {
  getProductList,
  getProductDetail,
} from './service';
import { message } from 'antd'

const Model = {
  namespace: 'sell',
  state: {
    detail: {},
    list: [],
    pagination: {
      total: 0,
      totalPage: 0,
      currentPage: 1,
      pageSize: 8,
    },
  },
  effects: {
    *getProductList({ payload }, { call, put }) {
      const res = yield call(getProductList, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveList',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
    *getProductDetail({ payload }, { call, put }) {
      const res = yield call(getProductDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveDetail',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
  },
  reducers: {
    saveList(state, action) {
      const { list, ...pagination } = action.payload
      return { ...state, list: state.list.concat(list), pagination };
    },
    saveDetail(state, action) {
      return { ...state, detail: action.payload };
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
          pageSize: 8,
        }
      };
    },
    initState(state, action) {
      return {
        detail: {},
        list: [],
        pagination: {
          total: 0,
          totalPage: 0,
          currentPage: 1,
          pageSize: 8,
        }
      };
    },
  },
};
export default Model;
