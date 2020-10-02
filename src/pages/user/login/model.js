import { routerRedux } from 'dva/router';
import {
  login,
  register,
  getCurrentUserInfo,
  updateCurrentUserInfo,
} from './service';
import { getPageQuery, setAuthority } from './utils/utils';
import { setToken, getToken, removeToken } from '@/utils/utils';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { message } from 'antd'

const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
    type: 'user',
    currentUserInfo: {},
  },
  effects: {
    *login({ body }, { call, put }) {
      const res = yield call(login, body);
      const { code, msg, data } = res;
      if (code === 0) {
        message.success(msg)
        const { token, type } = data;
        setToken(token);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            type,
          },
        })
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error(msg)
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            type: 'user',
          },
        })
      }
      return res
    },
    
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
        const { type } = payload;
        setAuthority(type);
        return { ...state, ...payload };
    },
  },
};
export default Model;
