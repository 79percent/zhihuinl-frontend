import { Table, Spin, Input, Popconfirm, Form, Card, Select, Tooltip, Icon, Avatar } from 'antd';
import '../styles/styles.less'
import moment from 'moment'

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
        width: 30,
        render: (text, record) => {
          return (
            <Popconfirm title="确定删除?" onConfirm={() => this.delete(record._id)}>
              <Icon type="delete" style={{ color: 'red', marginLeft: 8 }} />
            </Popconfirm>
          )
        },
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 150,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '问题描述',
        dataIndex: 'description',
        width: 150,
        ellipsis: true,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '图片',
        dataIndex: 'imgs',
        width: 80,
        ellipsis: true,
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
        title: '回复数',
        dataIndex: 'commentsNum',
        width: 40,
        render: (text, record) => (<Tooltip title={text}>{text}</Tooltip>)
      },
      {
        title: '发布人',
        dataIndex: 'userName',
        width: 100,
        ellipsis: true,
        render: (text, record) => (
          <>
            <Avatar
              size="small"
              style={{ marginRight: 8 }}
              src={record.avatar}
            />
            <Tooltip title={text}>{text}</Tooltip>
          </>
        )
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

  // 是否为编辑状态
  isEditing = record => record._id === this.state.editingKey;

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