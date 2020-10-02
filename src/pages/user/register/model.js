import { register } from './service';
import { message } from 'antd'
import { setToken } from '@/utils/utils'
import { routerRedux } from 'dva/router';

const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      const { code, msg, data } = response
      if (code === 0) {
        message.success(msg)
        const { token } = data
        setToken(token)
        yield put({
          type: 'registerHandle',
          payload: {
            ...data,
            status: 'ok'
          },
        });
        yield put(routerRedux.replace('/user/login'));
      } else {
        message.error(msg)
        yield put({
          type: 'registerHandle',
          payload: {
            ...data,
            status: 'error'
          },
        });
      }
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
