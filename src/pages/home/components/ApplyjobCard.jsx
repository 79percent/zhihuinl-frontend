/**
 * 首页-求职信息板块
 */
import { Card, Col, Icon, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const ApplyjobCard = ({ loading, list, title, onClick }) => {
  const columns = [
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.job-intension"
          defaultMessage="Search keyword"
        />
      ),
      dataIndex: 'title',
      key: 'title',
      render: text => <a onClick={onClick}>{text}</a>,
    },
    {
      title: <FormattedMessage id="dashboardandanalysis.table.name" defaultMessage="Users" />,
      dataIndex: 'name',
      key: 'name',
      className: styles.alignRight,
    },
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.sex"
          defaultMessage="Search keyword"
        />
      ),
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.age"
          defaultMessage="Weekly Range"
        />
      ),
      dataIndex: 'age',
      key: 'age',
      render: (text, record) => (
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.mobile"
          defaultMessage="Weekly Range"
        />
      ),
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text, record) => (
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}
        </span>
      ),
    },
  ];
  return (
    <Card
      loading={loading}
      bordered={false}
      title={title}
      style={{
        height: '100%',
      }}
    >
      <Table
        rowKey={record => record.index}
        size="middle"
        columns={columns}
        dataSource={list}
        scroll={{ y: 240 }}
        pagination={false}
      />
    </Card>
  );
}

export default ApplyjobCard;
