/**
 * 滞销求购产品列表页面
 */
import { Button, Card, Icon, List, Typography, Skeleton } from 'antd';
import React, { Component, Suspense } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import HeaderContent from '@/components/HeaderContent'
import ShopList from '@/components/ShopList'
import PageLoading from './components/PageLoading'
import { stringify } from 'qs';

@connect(({ sell, loading }) => ({
  list: sell.list,
  pagination: sell.pagination,
  loading: loading.effects['sell/getProductList'],
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
      type: 'sell/initState',
    });
  }

  //获取列表数据
  getData = (cur, page) => {
    const { dispatch, pagination } = this.props
    const { currentPage, pageSize } = pagination
    dispatch({
      type: 'sell/getProductList',
      payload: {
        currentPage: cur || currentPage,
        pageSize: page || pageSize,
      },
    });
  }

  //加载更多
  fetchMore = () => {
    const { pagination } = this.props
    const { currentPage, pageSize } = pagination
    this.getData(currentPage + 1, pageSize)
  };

  // 点击产品图片或者产品标题，跳转到产品详情
  handleClick = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/sell/detail',
      search: stringify({
        id,
      })
    }));
    window.scrollTo(0, 0)
  }

  //点击发布按钮，跳转到发布页面
  handleIssue = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/sell/add',
    }));
    window.scrollTo(0, 0)
  }

  render() {
    const {
      list,
      loading,
      pagination,
    } = this.props;
    const { totalPage, currentPage } = pagination
    const loadMore = list.length > 0 && (
      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
        }}
      >
        <Button
          onClick={this.fetchMore}
          style={{
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          {loading ? (
            <span>
              <Icon type="loading" /> 加载中...
            </span>
          ) : (
              '加载更多'
            )}
        </Button>
      </div>
    );
    const noMore = (
      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
        }}
      >
        <span>
          没有更多了...
        </span>
      </div>
    )
    return (
      <>
        <PageHeaderWrapper
          content={<HeaderContent text="您可以在这里发布您滞销的农产品或者查看别人发布的农产品" />}
          extraContent={<Button type="danger" size="large" onClick={this.handleIssue}>发布求购产品</Button>}
          title={false}
        >
          <div className={styles.cardList}>
            <div style={{
              marginTop: 24,
            }}>
              <Suspense fallback={<PageLoading loading={loading} />} >
                <ShopList onClick={this.handleClick} list={list} />
              </Suspense>
            </div>
          </div>
          {totalPage === currentPage ? noMore : loadMore}
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Applyjob;
