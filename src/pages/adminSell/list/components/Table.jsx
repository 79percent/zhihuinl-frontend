import { Table, Spin, Input, Popconfirm, Form, Card, Select, Tooltip, Avatar, Icon } from 'antd';
import '../styles/styles.less'

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
      editingKey: ''
    };
    this.columns = [
      {
        title: '操作',
        dataIndex: 'operation',
        width: 80,
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
                <Icon type="close" style={{ color: '#1890ff' }}/>
              </Popconfirm>
            </span>
          ) : (
              <>
                <Icon type="edit" onClick={() => this.edit(record._id)} style={{ color: '#1890ff' }} />
                <Popconfirm title="确定删除?" onConfirm={() => this.delete(record._id)}>
                  <Icon type="delete" style={{ color: 'red', marginLeft: 8 }} />
                </Popconfirm>
              </>
            );
        },
      },
      {
        title: '产品标题',
        dataIndex: 'title',
        width: 200,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '图片',
        dataIndex: 'imgs',
        width: 200,
        render: (text, record) => {
          return Array.isArray(text) ? text.map(item => {
            const { id, src } = item
            return (
              <Avatar
                key={id}
                shape="square"
                style={{ marginRight: 8 }}
                src={src}
              />
            )
          }) : null;
        }
      },
      {
        title: '库存数量',
        dataIndex: 'inventory',
        width: 80,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '产品单价',
        dataIndex: 'price',
        width: 80,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '联系方式',
        dataIndex: 'mobile',
        width: 160,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 150,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '产品介绍',
        dataIndex: 'introduce',
        width: 200,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '产品简介',
        dataIndex: 'description',
        width: 200,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
    ];
  }

  // 是否为编辑状态
  isEditing = record => record._id === this.state.editingKey;

  //取消
  cancel = () => {
    this.setState({ editingKey: '' });
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
      this.setState({ editingKey: '' });
    });
  }

  // 编辑
  edit(key) {
    this.setState({ editingKey: key });
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