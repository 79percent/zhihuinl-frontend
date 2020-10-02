import { Button, Card, Col, Form, Icon, List, Row, Select, Tag } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ArticleListContent from './components/ArticleListContent';
import styles from './style.less';
import { highLightKeyword } from '../utils/utils'

@connect(({ articles, loading }) => ({
  list: articles.list,
  keyword: articles.keyword,
  pagination: articles.pagination,
  loading: loading.effects['articles/getArticles'],
}))
class Articles extends Component {
  componentDidMount() {
    const { dispatch, pagination, keyword } = this.props
    const { currentPage, pageSize } = pagination
    dispatch({
      type: 'articles/getArticles',
      payload: {
        keyword,
        currentPage,
        pageSize,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'articles/initListAndPagination',
    });
  }

  //加载更多
  fetchMore = () => {
    const { dispatch, pagination, keyword } = this.props
    const { currentPage, pageSize } = pagination
    dispatch({
      type: 'articles/getArticles',
      payload: {
        keyword,
        currentPage: currentPage + 1,
        pageSize,
      },
    });
  };

  render() {
    const {
      list,
      loading,
      pagination,
      keyword,
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
      <Card
        style={{
          marginTop: 24,
        }}
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
      >
        <List
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="_id"
          itemLayout="vertical"
          loadMore={totalPage === currentPage ? noMore : loadMore}//底部加载更多or没有更多了
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item._id}
              extra={//右边图片
                <img
                  width={272}
                  alt="logo"
                  src={item.img}
                />
              }
            >
              <List.Item.Meta
                title={//标题
                  <a className={styles.listItemMetaTitle} href={item.href} target="_blank">
                    {highLightKeyword(item.title, keyword)}
                  </a>
                }
                description={//标签
                  <span>
                    {item.tags.split(' ').map(item => (
                      <Tag>{highLightKeyword(item, keyword)}</Tag>
                    ))}
                  </span>
                }
              />
              <ArticleListContent data={item} keyword={keyword} />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Articles;
