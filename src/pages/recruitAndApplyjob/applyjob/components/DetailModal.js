/**
 * 发布招聘信息的弹窗
 * onOk: (values)=>{}
 **/
import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Row, Col, Button } from 'antd';
import styles from '../style.less';

const colLeft = { display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }
const colRight = { display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }

class DetailModal extends Component {

  render() {
    const {
      visible,
      onClose,
      data,
    } = this.props
    const {
      _id,
      speciality,
      age,
      city,
      mobile,
      salary,
      title,
      name,
      sex,
      educationBackground,
      workExperience,
    } = data
    return (
      <Modal
        title="求职信息详情"
        visible={visible}
        onCancel={onClose}
        footer={<Button onClick={onClose}>关闭</Button>}
      >
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>求职意向：</Col>
          <Col span={19} style={colRight}>{title}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>年龄：</Col>
          <Col span={19} style={colRight}>{age}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>性别：</Col>
          <Col span={19} style={colRight}>{sex}</Col>
        </Row>
        <Row type="flex" justify="end" align="top">
          <Col span={5} style={colLeft}>学历：</Col>
          <Col span={19} style={colRight}>{educationBackground}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>所在城市：</Col>
          <Col span={19} style={colRight}>{city}</Col>
        </Row>
        <Row type="flex" justify="end" align="top">
          <Col span={5} style={colLeft}>个人特长：</Col>
          <Col span={19} style={colRight}>{speciality}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>工作经验/年：</Col>
          <Col span={19} style={colRight}>{workExperience}年</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>期望薪资/月：</Col>
          <Col span={19} style={colRight}>{salary}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>称呼：</Col>
          <Col span={19} style={colRight}>{name}</Col>
        </Row>
        <Row type="flex" justify="end" align="middle">
          <Col span={5} style={colLeft}>联系电话：</Col>
          <Col span={19} style={colRight}>{mobile}</Col>
        </Row>
      </Modal>
    )
  }
}


export default DetailModal