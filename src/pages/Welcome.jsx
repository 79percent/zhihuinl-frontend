import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="欢迎来到智慧农林网-后台管理系统"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageHeaderWrapper>
);
