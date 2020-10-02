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
  Tag,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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

class BasicForm extends Component {
  state = {
    previewVisible: false,//图片预览modal
    previewImage: '',
    fileList: [],
    submitting: false,
    inputVisible: false,
    inputValue: '',
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
        console.log(values);
        this.setState({
          submitting: true
        })
        const {
          title,
          content,
          href,
          img,
          tags,
        } = values
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('href', href);
        formData.append('tags', tags.join(' '));
        formData.append('img', img.file.originFileObj);
        const token = localStorage.getItem('token')
        const headers = {}
        if (token) {
          headers['token'] = token
        }
        reqwest({
          url: `${url}/article/addArticle`,
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
              })
              this.props.history.push({ pathname: 'list' });
              window.scrollTo(0, 0)
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
    this.props.history.push({ pathname: 'list' });
  }

  handleClose = removedTag => {
    const {
      form: { setFieldsValue, getFieldValue },
    } = this.props;
    let tags = getFieldValue('getFieldValue')
    tags = tags.filter(tag => tag !== removedTag);
    setFieldsValue({
      tags
    })
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      form: { setFieldsValue, getFieldValue },
    } = this.props;
    let tags = getFieldValue('tags') || []
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setFieldsValue({
      tags: tags.length > 0 ? tags : undefined
    })
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { previewVisible, previewImage, fileList, submitting, inputVisible, inputValue } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const tags = getFieldValue('tags')
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
          >
            <FormItem
              {...formItemLayout}
              label="文章标题"
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: "请输入文章标题",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="请输入文章标题"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章内容"
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: "请输入文章内容!",
                  },
                ],
              })(
                <TextArea
                  allowClear
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="请输入文章内容"
                  rows={6}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片"
            >
              {getFieldDecorator('img', {
                rules: [
                  {
                    required: true,
                    message: "请上传至少一张图片！",
                  },
                ],
              })(
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章标签"
            >
              {getFieldDecorator('tags', {
                rules: [
                  {
                    required: true,
                    type: "array",
                    message: "请至少添加一个标签！",
                  }
                ]
              })(
                <>
                  {tags && tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                        tagElem
                      );
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                      <Icon type="plus" /> 新增标签
                    </Tag>
                  )}
                </>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章链接"
            >
              {getFieldDecorator('href', {
                rules: [
                  {
                    required: true,
                    message: "请输入文章链接！",
                  },
                ],
              })(
                <Input
                  allowClear
                  placeholder="请输入文章链接"
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
                添加
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
