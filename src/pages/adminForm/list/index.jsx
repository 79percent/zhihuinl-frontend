import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TableCom from './components/Table';
import FilterFormCom from './components/FilterForm';

@connect(({ adminForm, loading }) => ({
  filterValues: adminForm.filterValues,
  list: adminForm.list,
  pagination: adminForm.pagination,
  loading: loading.effects['adminForm/getQuestionList'],
}))
export default class TableList extends React.PureComponent {

  componentDidMount() {
    this.getData()
  }

  // 获取数据
  getData = (values, cur, size) => {
    const { dispatch, pagination, filterValues } = this.props
    const { currentPage, pageSize } = pagination
    values = values || filterValues
    dispatch({
      type: 'adminForm/getQuestionList',
      payload: {
        ...values,
        currentPage: cur || currentPage,
        pageSize: size || pageSize,
      }
    });
  }

  // 设置model里的条件参数
  setFilterValues = (values) => {
    const { dispatch } = this.props
    dispatch({
      type: 'adminForm/saveFilterValues',
      payload: {
        ...values,
      }
    });
  }

  //删除用户
  handleDelete = (id) => {
    const { dispatch, filterValues } = this.props
    dispatch({
      type: 'adminForm/remove',
      payload: {
        _id: id,
      }
    }).then(res => {
      this.getData(filterValues)
    })
  }

  render() {
    const { filterValues, list, pagination, loading } = this.props
    return (
      <PageHeaderWrapper>
        <FilterFormCom
          getData={this.getData}
          setFilterValues={this.setFilterValues}
        />
        <TableCom
          filterValues={filterValues}
          list={list}
          pagination={pagination}
          loading={loading}
          getData={this.getData}
          onDelete={this.handleDelete}
        />
      </PageHeaderWrapper>
    )
  }
}