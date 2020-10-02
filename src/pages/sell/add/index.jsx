import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  InputNumber,
  Tooltip,
  Upload,
  Modal,
  message,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import reqwest from 'reqwest';
import styles from './style.less';
import url from '@/utils/domain';

const FormItem = Form.Item;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(({ sell }) => ({
  sell
}))
class BasicForm extends Component {
  state = {
    previewVisible: false,//图片预览modal
    previewImage: '',
    fileList: [],
    submitting: false,
  }

  // 控制图片预览modal显示隐藏
  handlePreviewVisible = () => {
    const { previewVisible } = this.state
    this.setState({
      previewVisible: !previewVisible
    });
  }

  // 点击预览图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // 文件状态改变的回调
  handleChange = ({ fileList }) => this.setState({ fileList });

  //点击提交
  handleSubmit = e => {
    const { form } = this.props;
    const { fileList } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          submitting: true
        })
        const {
          title,
          address,
          price,
          introduce,
          inventory,
          mobile,
          description,
        } = values
        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('price', price);
        formData.append('introduce', introduce);
        formData.append('inventory', inventory);
        formData.append('mobile', mobile);
        formData.append('description', description);
        fileList.forEach((img, index) => {
          formData.append(`img${index}`, img.originFileObj);
        })
        const token = localStorage.getItem('token')
        const headers = {}
        if (token) {
          headers['token'] = token
        }
        reqwest({
          // url: 'http://47.99.201.87:4000/sell/addProduct',
          url: `${url}/sell/addProduct`,
          method: 'post',
          headers,
          processData: false,
          data: formData,
          success: (res) => {//上传成功回调
            const { code, msg } = res
            if (code === 0) {
              message.success(msg)
              this.setState({
                submitting: false
              }, () => {
                const { history } = this.props
                history.goBack()
              })
            }
          },
          error: (err) => {//上传失败回调
            message.error('上传失败！')
          },
        });
      }
    });
  };

  // 点击取消，返回到上一页
  handleCancel = () => {
    const { history } = this.props
    history.goBack()
  }

  render() {
    const { previewVisible, previewImage, fileList, submitting } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <Form
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem
              {...formItemLayout}
              label="产品名称"
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: "请输入产品名称",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="给您的产品起个名称"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: "请输入产品简介",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="您的产品简介"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详情"
            >
              {getFieldDecorator('introduce', {
                rules: [
                  {
                    required: true,
                    message: "请输入产品详情!",
                  },
                ],
              })(
                <TextArea
                  allowClear
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="请输入您的产品介绍，让更多人知道它！"
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="产品图片"
            >
              {getFieldDecorator('imgs', {
                rules: [
                  {
                    required: true,
                    message: "请上传至少一张产品图片！",
                  },
                ],
              })(
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: "请输入产品价格!",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="价格"
                  addonAfter="/斤"
                  style={{ width: 140 }}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存"
            >
              {getFieldDecorator('inventory', {
                rules: [
                  {
                    required: true,
                    message: "请输入产品库存!",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="库存"
                  addonAfter="斤"
                  style={{ width: 140 }}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  所在地区
                  <em className={styles.optional}>
                    <Tooltip title="填写您当前所在的地址或者发货的地址">
                      <Icon
                        type="info-circle-o"
                        style={{
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: "请输入所在地区！",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="请输入您所在的地区！"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系方式"
            >
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: "请输入您的联系方式！",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="请输入您的联系方式"
                />,
              )}
            </FormItem>
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
                发布
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleCancel}
              >
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handlePreviewVisible}
          closeIcon={
            <Icon
              type="close-circle"
              theme="filled"
              style={{ position: 'absolute', top: 10, right: 10 }}
            />
          }
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(BasicForm);
