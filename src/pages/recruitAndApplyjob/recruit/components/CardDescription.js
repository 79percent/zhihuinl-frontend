/**
 * Card内容
 * 地点 | 公司
 * 要求内容
 * 薪资 联系方式
 **/
import React, { Component } from 'react';
import { Button, Card, Icon, List, Typography, Skeleton } from 'antd';
import styles from '../style.less';

const { Paragraph, Title, Text } = Typography; 

class HeaderContent extends Component {
  render() {
    const {
      city,
      site,
      details,
      salary,
      mobile,
    } = this.props
    return (
      <Paragraph
        className={styles.item}
      >
        <Text strong style={{ color: '#707070' }}>{city} | {site}</Text>
        <br />
        <Paragraph ellipsis={{ rows: 2 }} style={{height: 39}}>
          {details}
        </Paragraph>
        <div className={styles.salaryAndMobile}>
          <span className={styles.salary}>{salary}/天</span>
          <span className={styles.mobile}>
            <Icon type="phone" />
            {mobile}
          </span>
        </div>
      </Paragraph>
    )
  }
}

export default HeaderContent