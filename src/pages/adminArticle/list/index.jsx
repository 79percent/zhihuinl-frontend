import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TableCom from './components/Table';
import FilterFormCom from './components/FilterForm';

@connect(({ adminArticle, loading }) => ({
  filterValues: adminArticle.filterValues,
  list: adminArticle.list,
  pagination: adminArticle.pagination,
  loading: loading.effects['adminArticle/getArticles'],
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
      type: 'adminArticle/getArticles',
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
      type: 'adminArticle/saveFilterValues',
      payload: {
        ...values,
      }
    });
  }

  // 编辑保存
  handleUpdate = (params) => {
    const { dispatch, filterValues } = this.props
    dispatch({
      type: 'adminArticle/updateArticle',
      payload: {
        ...params
      }
    }).then(res => {
      this.getData(filterValues)
    })
  }

  //删除
  handleDelete = (id) => {
    const { dispatch, filterValues } = this.props
    dispatch({
      type: 'adminArticle/removeArticle',
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
          onSave={this.handleUpdate}
          onDelete={this.handleDelete}
        />
      </PageHeaderWrapper>
    )
  }
}