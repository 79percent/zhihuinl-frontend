import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
import { Icon } from 'antd';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>智慧农林网</span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 gechaofeng"
          links={[
            // {
            //   key: 'github',
            //   title: <Icon type="github" />,
            //   href: 'https://gitee.com/percent79',
            //   blankTarget: true,
            // },
            {
              key: 'github',
              title: '浙ICP备案号20014236',
              href: 'http://beian.miit.gov.cn',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
