import React, { Component } from 'react';
import { Alert, Checkbox, Icon, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        body: { ...values },
      })
    }
  };

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="userandregister.login.login" />
        </h3>
        <LoginComponents
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {status === 'error' &&
            loginType === 'account' &&
            !submitting &&
            this.renderMessage(
              formatMessage({
                id: 'userandlogin.login.message-invalid-credentials',
              }),
            )}
          <UserName
            name="userName"
            placeholder={`${formatMessage({
              id: 'userandlogin.login.userName',
            })}`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandlogin.userName.required',
                }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({
              id: 'userandlogin.login.password',
            })}`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandlogin.password.required',
                }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              this.loginForm.validateFields(this.handleSubmit);
            }}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="userandlogin.login.remember-me" />
            </Checkbox>
            <Link className={styles.register} to="/user/register" style={{ float: 'right' }}>
              <FormattedMessage id="userandlogin.login.signup" />
            </Link>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="userandlogin.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
