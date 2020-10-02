import React, { Component } from 'react';
import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ articles, loading }) => ({
  list: articles.list,
  keyword: articles.keyword,
  pagination: articles.pagination,
  loading: loading.effects['articles/getArticles'],
}))
class Search extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'articles/initState',
    });
  }

  //tab切换
  handleTabChange = key => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'articles':
        router.push(`${url}/articles`);
        break;
      default:
        break;
    }
  };

  //搜索
  handleSearch = (value = '') => {
    const { dispatch, pagination } = this.props
    const { currentPage, pageSize } = pagination
    dispatch({
      type: 'articles/initList',
    });
    dispatch({
      type: 'articles/getArticles',
      payload: {
        keyword: value,
        currentPage: 1,
        pageSize,
      },
    });
    dispatch({
      type: 'articles/saveKeyWord',
      payload: value,
    });
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');

    if (tabKey && tabKey !== '/') {
      return tabKey;
    }

    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'articles',
        tab: '文章',
      },
    ];
    const mainSearch = (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Input.Search
          allowClear
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleSearch}
          style={{
            maxWidth: 522,
            width: '100%',
          }}
        />
      </div>
    );
    const { children } = this.props;
    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
        title={false}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Search;
