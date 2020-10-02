import { Button, Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { stringify } from 'qs';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import HeaderContent from '@/components/HeaderContent'
import QuestionList from './components/QuestionList'

@connect(({ forum, loading }) => ({
  list: forum.list,
  pagination: forum.pagination,
  loading: loading.effects['forum/getQuestionList'],
}))
class Applyjob extends Component {
  state = {
    confirmLoading: false,//AddModal确认按钮的loading
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'forum/initState',
    });
  }

  //获取列表数据
  getData = (cur, page) => {
    const { dispatch, pagination } = this.props
    const { currentPage, pageSize } = pagination
    dispatch({
      type: 'forum/getQuestionList',
      payload: {
        currentPage: cur || currentPage,
        pageSize: page || pageSize,
      },
    });
  }

  //分页
  handlePageChange = (page) => {
    this.getData(page)
  }

  // 点击问题标题，跳转到问题详情页面
  handleClick = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/forum/detail',
      search: stringify({
        id,
      })
    }));
    window.scrollTo(0, 0)
  }

  //点击头部右侧的我要提问按钮，跳转到提问页面
  handleIssue = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/forum/add',
    }));
    window.scrollTo(0, 0)
  }

  render() {
    const {
      list,
      loading,
      pagination,
    } = this.props;
    return (
      <>
        <PageHeaderWrapper
          content={<HeaderContent text="遇到问题了吗？您可以在这里提问哦！" />}
          extraContent={<Button type="danger" size="large" onClick={this.handleIssue}>我要提问</Button>}
          title={false}
        >
          <div className={styles.cardList}>
            <div style={{
              marginTop: 24,
              backgroundColor: '#fff',
              padding: 20,
            }}>
              <Spin spinning={loading} >
                <QuestionList
                  list={list}
                  onClick={this.handleClick}
                  onPageChange={this.handlePageChange}
                  pagination={pagination}
                />
              </Spin>
            </div>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Applyjob;
