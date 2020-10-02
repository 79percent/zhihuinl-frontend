/**
 * 发布招聘信息的弹窗
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
        onOk(values, ()=>{
          form.resetFields();
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
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Modal
        title="发布招聘信息"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={onCancel}
        style={{ top: 20 }}
      >
        <Form {...formItemLayout} >
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="城市">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: '请输入城市!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="工作地点">
            {getFieldDecorator('site', {
              rules: [{ required: true, message: '请输入工作地点!' }],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="要求">
            {getFieldDecorator('details', {
              rules: [{ required: true, message: '请输入招聘要求!' }],
            })(<TextArea rows={3} allowClear />)}
          </Form.Item>
          <Form.Item label="性别要求" className="collection-create-form_last-form-item">
            {getFieldDecorator('sex', {
              initialValue: 'all',
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Radio.Group>
                <Radio value="all">不限男女</Radio>
                <Radio value="man">男</Radio>
                <Radio value="women">女</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="招聘人数">
            {getFieldDecorator('nums', {
              rules: [{ required: true, message: '请输入招聘人数!' }],
            })(<InputNumber min={0} allowClear />)}
          </Form.Item>
          <Form.Item label="薪资/天">
            {getFieldDecorator('salary', {
              rules: [{ required: true, message: '请输入薪资!' }],
            })(<InputNumber min={0} allowClear />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入联系方式!' }],
            })(<Input allowClear />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const FormAddModal = Form.create({ name: 'releaseRecruit' })(AddModal)

export default FormAddModal