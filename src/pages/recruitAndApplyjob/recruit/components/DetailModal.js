/**
 * 发布招聘信息的弹窗
 * onOk: (values)=>{}
 **/
import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Row, Col, Button } from 'antd';
import moment from 'moment'
import styles from '../style.less';

const colLeft = { display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }
const colRight = { display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }

class DetailModal extends Component {

  render() {
    const {
      visible,
      onClose,
      data = {},
    } = this.props
    const {
      title,
      city,
      site,
      details,
      sex,
      nums,
      salary,
      mobile,
      createTime,
    } = data
    return (
      <Modal
        title="招聘信息详情"
        visible={visible}
        onCancel={onClose}
        footer={<Button onClick={onClose}>关闭</Button>}
      >
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>标题：</Col>
          <Col span={19} style={colRight}>{title}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>城市：</Col>
          <Col span={19} style={colRight}>{city}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>工作地点：</Col>
          <Col span={19} style={colRight}>{site}</Col>
        </Row>
        <Row type="flex" justify="end" align="top">
          <Col span={5} style={colLeft}>要求：</Col>
          <Col span={19} style={colRight}>{details}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>性别要求：</Col>
          <Col span={19} style={colRight}>{sex}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>招聘人数：</Col>
          <Col span={19} style={colRight}>{nums}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>薪资/天：</Col>
          <Col span={19} style={colRight}>{salary}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>联系电话：</Col>
          <Col span={19} style={colRight}>{mobile}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>发布日期：</Col>
          <Col span={19} style={colRight}>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</Col>
        </Row>
      </Modal>
    )
  }
}

export default DetailModal