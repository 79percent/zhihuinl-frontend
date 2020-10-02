/**
 * 招工信息的model
 */
import {
  getRecruits,
  getRecruitDetail,
  addRecruit,
  removeRecruit,
  updateRecruit,
} from './service';
import { message } from 'antd'

const Model = {
  namespace: 'recruit',
  state: {
    list: [],
    detail: {},
  },
  effects: {
    *getRecruits({ payload }, { call, put }) {
      const res = yield call(getRecruits, payload);
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
    *getRecruitDetail({ payload }, { call, put }) {
      const res = yield call(getRecruitDetail, payload);
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
    *addRecruit({ payload }, { call, put }) {
      const res = yield call(addRecruit, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *removeRecruit({ payload }, { call, put }) {
      const res = yield call(removeRecruit, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *updateRecruit({ payload }, { call, put }) {
      const res = yield call(updateRecruit, payload);
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
      return { ...state, list: action.payload };
    },
    saveDetail(state, action) {
      return { ...state, detail: action.payload };
    },
  },
};
export default Model;
