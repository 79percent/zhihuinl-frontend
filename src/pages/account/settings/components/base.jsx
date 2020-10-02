/**
 * 基本设置
 */
import { Button, Form, Input, Select, Upload, message } from 'antd'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import GeographicView from './GeographicView'
import PhoneView from './PhoneView'
import styles from './BaseView.less'
import AvatarView from './AvatarView'

const FormItem = Form.Item
const { Option } = Select

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value
  if (!province.key) {
    callback('请输入您的所在省市!')
  }
  if (!city.key) {
    callback('请输入您的所在城市!')
  }
  callback()
}

@connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))
class BaseView extends Component {
  view = undefined

  componentDidMount() {
    this.setBaseInfo()
  }

  componentDidUpdate(preProps) {
    const { currentUser: preUser } = preProps
    const { currentUser } = this.props
    if(preUser.userId !== currentUser.userId){
      this.setBaseInfo()
    }
  }

  //设置表单默认值
  setBaseInfo = () => {
    const { currentUser, form } = this.props
    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {}
        obj[key] = currentUser[key] || undefined
        form.setFieldsValue(obj)
      })
    }
  }

  //获取头像url
  getAvatarURL() {
    const { currentUser } = this.props

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      return url
    }

    return ''
  }

  getViewDom = ref => {
    this.view = ref
  }

  //保存个人设置
  handlerSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'accountAndsettings/updateCurrentUserInfo',
          body: { ...values },
        }).then(res => {
          if (res.code === 0) {
            dispatch({
              type: 'user/fetchCurrent',
            })
          }
        })
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.userName',
              })}
            >
              {getFieldDecorator('userName', {

              })(<Input disabled={true} />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.password',
              })}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的密码'
                  },
                ],
              })(<Input.Password/>)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.nickname',
              })}
            >
              {getFieldDecorator('name', {

              })(<Input placeholder="请输入您的昵称"/>)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.profile',
              })}
            >
              {getFieldDecorator('profile', {

              })(
                <Input.TextArea
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.profile-placeholder',
                  })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.address',
              })}
            >
              {getFieldDecorator('address', {

              })(<Input placeholder="请输入您的街道地址"/>)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.email',
              })}
            >
              {getFieldDecorator('email', {

              })(<Input placeholder="请输入您的邮箱"/>)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'accountandsettings.basic.phone',
              })}
            >
              {getFieldDecorator('phone', {

              })(<Input placeholder="请输入您的联系电话"/>)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>
              <FormattedMessage
                id="accountandsettings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    )
  }
}

export default Form.create()(BaseView)
