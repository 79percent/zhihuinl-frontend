import {
  getApplyjobList,
  updateApplyjob,
  removeApplyjob
} from '../services';
import { message } from 'antd';

const initState = {
  filterValues: {
    title: null,
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
  namespace: 'adminApplyjob',
  state: {
    ...initState
  },
  effects: {
    *getApplyjobList({ payload }, { call, put }) {
      const res = yield call(getApplyjobList, payload);
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
    *updateApplyjob({ payload }, { call, put }) {
      const res = yield call(updateApplyjob, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *removeApplyjob({ payload }, { call, put }) {
      const res = yield call(removeApplyjob, payload);
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
