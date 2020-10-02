/**
 * 发布求职信息的弹窗
 * onOk: (values)=>{}
 **/
import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber } from 'antd';
import styles from '../style.less';

const { TextArea } = Input;

class AddModal extends Component {
  //确定
  handleOk = () => {
    const { onOk, form } = this.props
    if (typeof onOk === 'function') {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        onOk(values, () => {
          form.resetFields()
        })
      });
    }
  }

  //取消，重置表单
  handleCancel = () => {
    const { onCancel, form } = this.props
    form.resetFields();
    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  render() {
    const {
      visible,
      confirmLoading,
      onCancel,
      form,
    } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Modal
        title="发布求职信息"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={onCancel}
        style={{ top: 20 }}
      >
        <Form {...formItemLayout} >
          <Form.Item label="求职意向">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入您的求职意向!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {
              rules: [{ required: true, message: '请输入您的年龄!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="性别" className="collection-create-form_last-form-item">
            {getFieldDecorator('sex', {
              initialValue: 'man',
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Radio.Group>
                <Radio value="man">男</Radio>
                <Radio value="women">女</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="学历">
            {getFieldDecorator('educationBackground', {
              rules: [{ required: true, message: '请输入您的学历!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="所在城市">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: '请输入您的所在城市!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="特长/工作经历">
            {getFieldDecorator('speciality', {
              rules: [{ required: true, message: '请输入您的特长/工作经历!' }],
            })(<TextArea rows={3} allowClear />)}
          </Form.Item>
          <Form.Item label="工作经验/年">
            {getFieldDecorator('workExperience', {
              rules: [{ required: true, message: '请输入您的工作经验!' }],
            })(<InputNumber min={0} allowClear />)}
          </Form.Item>
          <Form.Item label="期望薪资/月">
            {getFieldDecorator('salary1', {
              rules: [{ required: true, message: '请输入您的期望薪资!' }],
            })(
            <InputNumber min={0} allowClear />
            )}
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
            {getFieldDecorator('salary2', {
              rules: [{ required: true, message: '请输入您的期望薪资!' }],
            })(<InputNumber min={0} allowClear />)}
          </Form.Item>
          <Form.Item label="称呼">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入您的称呼!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入您的联系电话!' }],
            })(<Input allowClear />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const FormAddModal = Form.create({ name: 'releaseRecruit' })(AddModal)

export default FormAddModal