import { Table, Spin, Input, Popconfirm, Form, Card, Select, Tooltip, Avatar, Icon, Tag } from 'antd';
import '../styles/styles.less'
import moment from 'moment'

const { Option } = Select;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  renderEditCom = () => {
    return (
      <Input placeholder="请输入"></Input>
    );
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      colTitle,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入${colTitle}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.renderEditCom())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      inputVisible: false,
      inputValue: '',
      tags: null,
    };
    this.columns = [
      {
        title: '操作',
        dataIndex: 'operation',
        width: 40,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Icon type="check" onClick={() => this.save(form, record._id)} style={{ marginRight: 8, color: '#1890ff' }} />
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消编辑?" onConfirm={() => this.cancel(record._id)}>
                <Icon type="close" style={{ color: '#1890ff' }} />
              </Popconfirm>
            </span>
          ) : (
              <>
                <Icon type="edit" onClick={() => this.edit(record)} style={{ color: '#1890ff' }} />
                <Popconfirm title="确定删除?" onConfirm={() => this.delete(record._id)}>
                  <Icon type="delete" style={{ color: 'red', marginLeft: 8 }} />
                </Popconfirm>
              </>
            );
        },
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 160,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '图片',
        dataIndex: 'img',
        width: 40,
        render: (text, record) => (
          <Avatar
            shape="square"
            src={text}
          />
        )
      },
      {
        title: '文章标签',
        dataIndex: 'tags',
        width: 120,
        ellipsis: true,
        render: (text, record) => {
          const arr = text.split(" ");
          const { editingKey, inputValue, inputVisible } = this.state;
          const { _id } = record
          return (
            <>
              {arr.map(item => {
                return (<Tag key={item} closable={editingKey === _id} onClose={() => this.handleClose(item)}>{item}</Tag>)
              })}
              {editingKey === _id && inputVisible && (
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
              {editingKey === _id && !inputVisible && (
                <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                  <Icon type="plus" /> 新增标签
                </Tag>
              )}
            </>
          )
        },
      },
      {
        title: '文章内容',
        dataIndex: 'content',
        width: 150,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '文章链接',
        dataIndex: 'href',
        width: 150,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}><a href={text} target="_blank">{text}</a></Tooltip>)
      },
      {
        title: '发布日期',
        dataIndex: 'createTime',
        width: 100,
        render: (text, record) => {
          const time = moment(text).format("YYYY-MM-DD HH:mm:ss")
          return (
            <Tooltip title={time}>{time}</Tooltip>
          )
        }
      },
    ];
  }

  // 展示标签输入框
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  // 标签input的ref
  saveInputRef = input => (this.input = input);

  // 标签输入框输入时
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // 输入框失去焦点或者回车时，保存标签
  handleInputConfirm = () => {
    const { onSave } = this.props
    let { inputValue, tags, editingKey } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      inputValue = inputValue.trim()
      tags = [...tags, inputValue];
    }
    onSave && onSave({_id: editingKey, tags: tags.join(' ')})
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  // 删除标签
  handleClose = removedTag => {
    let { editingKey, tags } = this.state;
    const { onSave } = this.props;
    tags = tags.filter(tag => tag !== removedTag);
    onSave && onSave({_id: editingKey, tags: tags.join(' ')});
    this.setState({ tags });
  };

  // 是否为编辑状态
  isEditing = record => record._id === this.state.editingKey;

  //取消
  cancel = () => {
    this.setState({
      editingKey: '',
      inputVisible: false,
      inputValue: '',
      tags: null,
    });
  };

  //保存
  save(form, key) {
    const { editingKey } = this.state
    const { onSave } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      onSave && onSave({ _id: editingKey, ...row })
      this.setState({
        editingKey: '',
        inputVisible: false,
        inputValue: '',
        tags: null,
      });
    });
  }

  // 编辑
  edit(record) {
    const { _id, tags } = record
    this.setState({
      editingKey: _id,
      tags: tags.split(" ")
    });
  }

  //删除
  delete(key) {
    const { onDelete } = this.props
    onDelete && onDelete(key)
  }

  // 分页
  changePage = (pageNumber) => {
    const { getData } = this.props
    getData && getData(null, pageNumber)
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          colTitle: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const { list, pagination, loading } = this.props
    const {
      total,
      totalPage,
      currentPage,
      pageSize,
    } = pagination
    return (
      <Spin spinning={loading}>
        <Card>
          <EditableContext.Provider value={this.props.form}>
            <Table
              rowKey="_id"
              size="small"
              scroll={{ x: 1500 }}
              components={components}
              bordered
              dataSource={list}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                total,
                totalPage,
                current: currentPage,
                pageSize,
                onChange: this.changePage
              }}
            />
          </EditableContext.Provider>
        </Card>
      </Spin>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;