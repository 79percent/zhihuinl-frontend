import { queryCurrent, query as queryUsers } from '@/services/user';
import { message } from 'antd'

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    //获取当前用户的信息
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
  },
  reducers: {
    saveCurrentUser(state, action) {
      const { payload } = action
      return { ...state, currentUser: { ...payload } };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
