/**
 * 头像组件
 */
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Icon, Button, Upload, message } from 'antd';
import React, { Component, Fragment } from 'react';
import styles from './BaseView.less';
import reqwest from 'reqwest'
import { connect } from 'dva';
import url from '@/utils/domain';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请选择JPG/PNG文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能大于2MB!');
  }
  return isJpgOrPng && isLt2M;
}

@connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))
class AvatarView extends Component {
  state = {
    loading: false,
  }

  //选择文件时
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { avatar, dispatch } = this.props
    const { loading } = this.state
    const token = localStorage.getItem('token')
    const headers = {}
    if (token) {
      headers['token'] = token
    }
    const uploadProps = {
      name: "avatar",
      showUploadList: false,
      beforeUpload,
      onChange: this.handleChange,
      customRequest: info => {//手动上传
        const formData = new FormData();
        formData.append('avatar', info.file);//名字和后端接口名字对应
        reqwest({
          url: `${url}/user/uploadAvatar`,//上传url
          method: 'post',
          headers,
          processData: false,
          data: formData,
          success: (res) => {//上传成功回调
            const {code, msg} = res
            if (code === 0) {
              message.success(msg)
              this.setState({
                loading: false
              })
              dispatch({
                type: 'accountAndsettings/fetchCurrent',
              })
              dispatch({
                type: 'user/fetchCurrent',
              })
            }
          },
          error: (err) => {//上传失败回调
            message.error('上传失败！')
          },
        });
      },
    }
      return(
      <Fragment>
      <div className={styles.avatar_title}>
        <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" />
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload {...uploadProps}>
      <div className={styles.button_view}>
        <Button icon="upload" loading={loading}>
          <FormattedMessage
            id="accountandsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
        </Upload >
      </Fragment >
    );
  }
}

export default AvatarView;
