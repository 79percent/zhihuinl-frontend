import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Upload,
  Modal,
  message,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import reqwest from 'reqwest';
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
        const {
          title,
          description,
        } = values
        if (title.trim() === '') {
          Modal.warning({
            content: '您输入的标题有误，请重新输入！',
          })
        } else {
          const formData = new FormData();
          formData.append('title', title.trim());
          formData.append('description', description ? description.trim() : "");
          fileList.forEach((img, index) => {
            formData.append(`img${index}`, img.originFileObj);
          })
          const token = localStorage.getItem('token')
          const headers = {}
          if (token) {
            headers['token'] = token
          }
          this.setState({
            submitting: true
          })
          reqwest({
            // url: 'http://47.99.201.87:4000/question/add',
            url: `${url}/question/add`,
            method: 'post',
            headers,
            processData: false,
            data: formData,
            success: (res) => {//上传成功回调
              this.setState({
                submitting: false
              })
              const { code, msg } = res
              if (code === 0) {
                const { history } = this.props
                history.goBack()
              } else {
                message.error(msg)
              }
            },
            error: (err) => {//上传失败回调
              message.error('上传失败！')
            },
          });
        }
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
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: "请输入标题",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="一句话概括你的问题"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {getFieldDecorator('description')(
                <TextArea
                  allowClear
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="详细说明问题，以便更好的获得回答"
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片"
            >
              {getFieldDecorator('imgs')(
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
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
                提交
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
