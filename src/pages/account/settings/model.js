import {
  queryCity,
  queryCurrent,
  updateCurrentUserInfo,
  queryProvince,
  query as queryUsers
} from './service';
import { message } from 'antd'

const Model = {
  namespace: 'accountAndsettings',
  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    //更新当前用户的个人信息
    *updateCurrentUserInfo({ body }, { call, put }) {
      const res = yield call(updateCurrentUserInfo, body);
      const { code, msg } = res
      if (code === 0) {
        message.success(msg)
      } else {
        message.error(msg)
      }
      return res
    },

    //获取当前用户的个人信息
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const { code, msg, data } = response
      if (code === 0) {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        })
      } else {
        message.error(msg)
      }
      return response
    },

    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
    },

    *fetchCity({ payload }, { call, put }) {
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      const { payload } = action
      return { ...state, currentUser: { ...payload } };
    },

    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    setProvince(state, action) {
      return { ...state, province: action.payload };
    },

    setCity(state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
