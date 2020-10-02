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
          <Form.Item label="关键字">
            {getFieldDecorator(`keyword`, {})(<Input placeholder="请输入关键字" />)}
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
    const { getData, setFilterValues, form } = this.props
    const params = {
      keyword: null,
    }
    form.resetFields();
    setFilterValues && setFilterValues(params)
    getData && getData(params, 1)
  };

  render() {
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
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
