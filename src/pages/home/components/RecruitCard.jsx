/**
 * 首页-招聘信息板块
 */
import { Card, Col, Icon, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const RecruitCard = ({ loading, list, title, onClick }) => {
  const columns = [
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.job-content"
          defaultMessage="标题"
        />
      ),
      dataIndex: 'title',
      key: 'title',
      render: text => <a onClick={onClick}>{text}</a>,
    },
    {
      title: <FormattedMessage id="dashboardandanalysis.table.workplace" defaultMessage="工作地点" />,
      dataIndex: 'site',
      key: 'site',
      className: styles.alignRight,
    },
    {
      title: (
        <FormattedMessage
          id="dashboardandanalysis.table.salary"
          defaultMessage="薪资"
        />
      ),
      dataIndex: 'salary',
      key: 'salary',
      sorter: (a, b) => a.salary - b.salary,
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
          defaultMessage="联系电话"
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

export default RecruitCard;
