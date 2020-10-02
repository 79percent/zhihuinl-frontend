import { Table, Spin, Input, Popconfirm, Form, Card, Select, Tooltip, Icon } from 'antd';
import moment from 'moment'
import '../styles/styles.less'

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
        width: 60,
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
        title: '工作标题',
        dataIndex: 'title',
        width: 150,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '工作内容详情',
        dataIndex: 'details',
        width: 150,
        editable: true,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '公司',
        dataIndex: 'site',
        width: 80,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '性别要求',
        dataIndex: 'sex',
        width: 80,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '所在城市',
        dataIndex: 'city',
        width: 100,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '期望薪资/天',
        dataIndex: 'salary',
        width: 100,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '联系电话',
        dataIndex: 'mobile',
        width: 120,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '招聘人数',
        dataIndex: 'nums',
        width: 80,
        editable: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '发布日期',
        dataIndex: 'createTime',
        width: 120,
        render: (text, record) => {
          const time = moment(text).format("YYYY-MM-DD HH:mm:ss")
          return (
            <Tooltip title={time}>{time}</Tooltip>
          )
        }
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