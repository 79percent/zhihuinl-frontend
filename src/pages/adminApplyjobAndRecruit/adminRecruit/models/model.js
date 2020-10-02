import {
  getList,
  update,
  remove
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
  namespace: 'adminRecruit',
  state: {
    ...initState
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const res = yield call(getList, payload);
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
    *update({ payload }, { call, put }) {
      const res = yield call(update, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *remove({ payload }, { call, put }) {
      const res = yield call(remove, payload);
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
