import { Spin, Modal } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from '../style.less';
import CommentList from '../components/CommentList'
import Detail from '../components/Detail'
import Editor from '../components/Editor'

@connect(({ forum, loading }) => ({
  questionDetail: forum.questionDetail,
  loading: loading.effects['forum/getDetail'],
}))
class SellDetail extends Component {
  state = {
    value: '',//输入框的值
    submitting: false,//按钮状态
  }

  componentDidMount() {
    const { location } = this.props
    const { query } = location
    const { id } = query
    this.id = id
    this.getData(id)
  }

  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch({
      type: 'forum/init',
    });
  }

  //获取数据
  getData = (id, page) => {
    const { dispatch, questionDetail } = this.props
    const {
      currentPage,
      pageSize,
    } = questionDetail
    dispatch({
      type: 'forum/getDetail',
      payload: {
        _id: id,
        currentPage: page || currentPage,
        pageSize,
      },
    });
  }

  //输入框输入时
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  //点击提交一级评论
  handleSubmit = () => {
    const { value } = this.state
    if (value === '') {
      Modal.warning({
        content: '请输入后再提交哦！',
      })
    } else {
      const { dispatch } = this.props
      dispatch({
        type: 'forum/comment',
        payload: {
          commentId: null,
          parentCommentId: null,
          targetUserId: null,
          questionId: this.id,
          content: value
        },
      }).then(res => {
        this.setState({
          value: ''
        })
        this.getData(this.id)
      })
    }
  }

  //点击提交二级评论或回复二级评论
  handleSubmit2Comment = (questionId, commentId, parentCommentId, targetUserId, value, callback) => {
    const { dispatch } = this.props
    dispatch({
      type: 'forum/comment',
      payload: {
        commentId,
        parentCommentId,
        targetUserId: targetUserId,
        questionId,
        content: value
      },
    }).then(res => {
      callback()
      this.getData(this.id)
      dispatch({
        type: 'forum/getChildComments',
        payload: {
          questionId,
          parentCommentId
        },
      })
    })
  }

  //点击查看评论
  handleClickLookComment = (questionId, parentCommentId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'forum/getChildComments',
      payload: {
        questionId,
        parentCommentId
      },
    })
  }

  //翻页
  handlePageChange = (page) => {
    this.getData(this.id, page)
    window.scrollTo(0, 0)
  }

  render() {
    const { submitting, value } = this.state
    const { questionDetail, loading } = this.props
    const { detail, comments, childComments, pagination } = questionDetail
    const { title } = detail
    const { currentPage } = pagination
    return (
      <PageHeaderWrapper title={false}>
        <Spin spinning={loading}>
          <div className={styles.cardList}>
            <div style={{
              marginTop: 24,
              backgroundColor: '#fff',
              padding: 20
            }}>
              <h1 style={{ fontSize: 25 }}>{title}</h1>
              <Detail data={detail} currentPage={currentPage} />
              <CommentList
                list={comments}
                childComments={childComments}
                pagination={pagination}
                handleClickLookComment={this.handleClickLookComment}
                onSubmitComment={this.handleSubmit2Comment}
                onPageChange={this.handlePageChange}
              />
              <div style={{ marginTop: 20 }}></div>
              <Editor
                label="发表回复"
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            </div>
          </div>
        </Spin>
      </PageHeaderWrapper >
    );
  }
}

export default SellDetail;
