/**
 * 滞销求购的model
 */
import {
  getQuestionList,
  addQuestion,
  getDetail,
  comment,
  getChildComments,
} from './service';
import { message } from 'antd'

const initState = {
  questionDetail: {
    detail: {},//问题详情
    comments: [],//一级评论
    pagination: {
      total: 0,
      totalPage: 0,
      currentPage: 1,
      pageSize: 8,
    },
    childComments: [],//子评论
  },
  list: [],
  pagination: {
    total: 0,
    totalPage: 0,
    currentPage: 1,
    pageSize: 8,
  },
}

const Model = {
  namespace: 'forum',
  state: {
    ...initState
  },
  effects: {
    *getQuestionList({ payload }, { call, put }) {
      const res = yield call(getQuestionList, payload);
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
    *getDetail({ payload }, { call, put }) {
      const res = yield call(getDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveQuestion',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
    *getChildComments({ payload }, { call, put }) {
      const res = yield call(getChildComments, payload);
      if (res.code === 0) {
        yield put({
          type: 'saveChildComments',
          payload: res.data,
        });
      } else {
        message.error(res.msg)
      }
      return res
    },
    *addQuestion({ payload }, { call, put }) {
      const res = yield call(addQuestion, payload);
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res
    },
    *comment({ payload }, { call, put }) {
      const res = yield call(comment, payload);
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
      return { ...state, list, pagination };
    },
    saveChildComments(state, action) {
      const { questionDetail } = state
      return {
        ...state,
        questionDetail: {
          ...questionDetail,
          childComments: action.payload,
        }
      };
    },
    saveQuestion(state, action) {
      const { detail, comments, ...pagination } = action.payload
      const { questionDetail } = state
      return {
        ...state,
        questionDetail: {
          ...questionDetail,
          detail,
          comments,
          pagination,
        }
      };
    },
    init() {
      return {
        ...initState
      };
    }
  },
};
export default Model;
