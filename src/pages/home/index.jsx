import { Col, Dropdown, Icon, Menu, Row, Skeleton } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import { FormattedMessage } from 'umi-plugin-react/locale';

const ShopList = React.lazy(() => import('@/components/ShopList'));
const BannerCard = React.lazy(() => import('./components/BannerCard'));
const RecruitCard = React.lazy(() => import('./components/RecruitCard'));
const ApplyjobCard = React.lazy(() => import('./components/ApplyjobCard'));

@connect(({ home: { articleList, applyjobList, recruitList, productList }, loading }) => ({
  articleList,
  applyjobList,
  recruitList,
  productList,
  loading1: loading.effects['home/getArticles'],
  loading2: loading.effects['home/getApplyjobs'],
  loading3: loading.effects['home/getRecruits'],
  loading4: loading.effects['home/getProductList'],
}))
class Analysis extends Component {
  state = {

  };

  componentDidMount() {
    this.queryArticleList()
    this.queryApplyjobs()
    this.queryRecruits()
    this.queryProductList()
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/clear',
    });
  }

  queryArticleList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getArticles',
      payload: {
        currentPage: 1,
        pageSize: 7,
      },
    });
  }

  queryApplyjobs = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getApplyjobs',
    });
  }

  queryRecruits = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getRecruits',
    });
  }

  queryProductList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/getProductList',
      payload: {
        currentPage: 1,
        pageSize: 8,
      },
    });
  }

  // 点击产品图片或者产品标题，跳转到产品详情
  handleClickProduct = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/sell/detail',
      search: stringify({
        id,
      })
    }));
    window.scrollTo(0, 0)
  }

  handleClickRecruit = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/recruitAndApplyJob/recruit',
    }));
    window.scrollTo(0, 0)
  }

  handleClickApplyjob = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/recruitAndApplyJob/applyjob',
    }));
    window.scrollTo(0, 0)
  }

  render() {
    const {
      articleList,
      applyjobList,
      recruitList,
      productList,
      loading1,
      loading2,
      loading3,
      loading4,
    } = this.props;
    return (
      <GridContent>
        <React.Fragment>
          {/* 轮播图和热门文章区域 */}
          <Suspense fallback={null}>
            <BannerCard
              loading={loading1}
              list={articleList}
            />
          </Suspense>
          {/* 招工和求职区域 */}
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <RecruitCard
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.recruit-information"
                      defaultMessage="Online Top Search"
                    />
                  }
                  loading={loading2}
                  list={recruitList}
                  onClick={this.handleClickRecruit}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ApplyjobCard
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.applyjob-information"
                      defaultMessage="Online Top Search"
                    />
                  }
                  loading={loading3}
                  list={applyjobList}
                  onClick={this.handleClickApplyjob}
                />
              </Suspense>
            </Col>
          </Row>
          {/* 产品列表展示区域 */}
          <Suspense fallback={null} >
            <ShopList
              loading={loading4}
              list={productList}
              onClick={this.handleClickProduct}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
