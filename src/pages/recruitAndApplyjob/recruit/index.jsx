import { Button, Card, Icon, List, Typography, Skeleton } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import HeaderContent from '@/components/HeaderContent'
import CardItem from './components/CardItem'
import AddModal from './components/AddModal'
import DetailModal from './components/DetailModal'

const { Paragraph, Title, Text } = Typography;

@connect(({ recruit, loading }) => ({
  list: recruit.list,
  detail: recruit.detail,
  loading: loading.effects['recruit/getRecruits'],
}))
class Recruit extends Component {
  state = {
    confirmLoading: false,//AddModal确认按钮的loading
    addModalVisible: false,//AddModal
    detailModalVisible: false,//detailModal
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'recruit/getRecruits',
    });
  }

  //AddModal的显示隐藏
  handleModalVisible = () => {
    const { addModalVisible } = this.state
    this.setState({
      addModalVisible: !addModalVisible
    })
  }

  //点击发布招聘信息按钮
  handleClickBtn = () => {
    this.handleModalVisible()
  }

  /**
   * 确认发布招聘信息
   * callback: 清空form表单值
   */
  handleSubmit = (values, callback) => {
    const { dispatch } = this.props
    this.setState({
      confirmLoading: true,
    })
    dispatch({
      type: 'recruit/addRecruit',
      payload: { ...values }
    }).then(res => {
      const { code } = res
      if (code === 0) {
        this.setState({
          confirmLoading: false,
        })
        this.handleModalVisible()
        this.getData()
        callback()
      }
    })

  }

  //AddModal取消
  handleCancel = () => {
    this.handleModalVisible()
    this.setState({
      confirmLoading: false,
    })
  }

  //获取详情数据
  getDetail = (id) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'recruit/getRecruitDetail',
      payload: { _id: id }
    })
  }

  //点击查看详情
  handleClickDetail = (id) => {
    this.getDetail(id).then(res => {
      this.handleDetailVisible()
    })
  }

  //关闭详情Modal
  handleDetailVisible = () => {
    const { detailModalVisible } = this.state
    this.setState({
      detailModalVisible: !detailModalVisible
    })
  }

  render() {
    const {
      list,
      detail,
      loading,
    } = this.props;
    const {
      confirmLoading,
      addModalVisible,
      detailModalVisible,
    } = this.state
    const nullData = {};
    return (
      <>
        <PageHeaderWrapper
          content={<HeaderContent text="您可以在这里看到别人发布的招聘信息或者发布自己的招聘信息。" />}
          title={false}
        >
          <div className={styles.cardList}>
            <List
              rowKey="_id"
              loading={loading}
              grid={{
                gutter: 24,
                lg: 3,
                md: 2,
                sm: 1,
                xs: 1,
              }}
              dataSource={[nullData, ...list]}
              renderItem={item => {
                const {
                  _id,
                  title,
                  site,
                  salary,
                  details,
                  mobile,
                  city,
                } = item
                if (item && _id) {
                  return (
                    <List.Item key={`${_id}`}>
                      <CardItem
                        onClick={() => this.handleClickDetail(_id)}
                        loading={loading}
                        id={_id}
                        title={title}
                        site={site}
                        city={city}
                        details={details}
                        salary={salary}
                        mobile={mobile}
                      />
                    </List.Item>
                  );
                }

                return (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton} onClick={this.handleClickBtn}>
                      <Icon type="plus" /> 发布招工信息
                  </Button>
                  </List.Item>
                );
              }}
            />
          </div>
        </PageHeaderWrapper>
        <AddModal
          confirmLoading={confirmLoading}
          visible={addModalVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        />
        <DetailModal
          data={detail}
          visible={detailModalVisible}
          onClose={this.handleDetailVisible}
        />
      </>
    );
  }
}

export default Recruit;
