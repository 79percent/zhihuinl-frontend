/**
 * 注册结果页面
 */
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="userandregister-result.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <FormattedMessage
            id="userandregister-result.register-result.msg"
            values={{
              userName: location.state ? location.state.userName : '',
            }}
          />
        </div>
      }
      extra={actions}
    />
  );
}

export default RegisterResult;
