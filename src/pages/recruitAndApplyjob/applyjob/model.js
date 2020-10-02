/**
 * 求职信息的model
 */
import {
  getApplyjobs,
  getApplyjobDetail,
  addApplyjob,
  removeApplyjob,
  updateApplyjob,
} from './service';
import { message } from 'antd'

const Model = {
  namespace: 'applyjob',
  state: {
    list: [],
    detail: {},
  },
  effects: {
    *getApplyjobs({ payload }, { call, put }) {
      const res = yield call(getApplyjobs, payload);
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
    *getApplyjobDetail({ payload }, { call, put }) {
      const res = yield call(getApplyjobDetail, payload);
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
    *addApplyjob({ payload }, { call, put }) {
      const res = yield call(addApplyjob, payload);
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
    *updateApplyjob({ payload }, { call, put }) {
      const res = yield call(updateApplyjob, payload);
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
