/**
 * 条件筛选框组件
 */
import { Form, Row, Col, Input, Button, Icon, Card, Select } from 'antd';
import '../styles/styles.less'

const { Option } = Select;

class AdvancedSearchForm extends React.Component {
  // 渲染条件框
  getFields() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Col span={8}>
          <Form.Item label="账号">
            {getFieldDecorator(`userName`, {})(<Input placeholder="请输入账号" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="权限">
            {getFieldDecorator(`type`, {})(
              <Select style={{ width: 160 }} placeholder="请选择账号权限">
                <Option value="user">普通注册用户</Option>
                <Option value="admin">网站管理员</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={``}>
            <Button type="primary" onClick={this.handleSearch}>
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
      </>
    )
  }

  //搜索
  handleSearch = e => {
    e.preventDefault();
    const { getData, setFilterValues } = this.props
    this.props.form.validateFields((err, values) => {
      setFilterValues && setFilterValues(values)
      getData && getData(values)
    });
  };

  //重置
  handleReset = () => {
    const { getData, setFilterValues } = this.props
    this.props.form.resetFields();
    setFilterValues && setFilterValues({
      userName: null,
      type: null
    })
    getData && getData({
      userName: null,
      type: null
    }, 1)
  };

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ marginBottom: 24 }}>
        <Card>
          <Form className="ant-advanced-search-form" layout="inline">
            <Row
              gutter={24}
              type="flex"
              justify="space-between"
              align="middle"
            >
              {this.getFields()}
            </Row>
            {/* <Row>
              <Col span={8}></Col>
              <Col span={8}></Col>
              <Col span={8}>
                <Form.Item label={``}>
                  {getFieldDecorator(`btns`, {})(
                    <>
                      <Button type="primary">
                        搜索
                        </Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        重置
                        </Button>
                    </>
                  )}
                </Form.Item>
              </Col>
            </Row> */}
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
