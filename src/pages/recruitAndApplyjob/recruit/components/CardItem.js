/**
 * 招聘&求职Card组件
 */
import React, { Component } from 'react';
import { Button, Card, Icon, List, Typography, Skeleton } from 'antd';
import styles from '../style.less';
import CardFooterButton from './CardFooterButton'
import CardDescription from './CardDescription'

const { Paragraph, Title, Text } = Typography;

class CardItem extends Component {
  render() {
    const {
      onClick,//点击查看详情
      loading,//加载状态
      title,//标题
      site,//公司
      city,//城市
      details,//要求内容详情
      salary,//薪资
      mobile,//联系方式
    } = this.props
    return (
      <Card
        hoverable
        className={styles.card}
        actions={[<CardFooterButton onClick={onClick} />]}
      >
        <Skeleton loading={loading} active>
          <Card.Meta
            title={<Title level={3}>{title}</Title>}
            description={
              <CardDescription
                site={site}
                city={city}
                details={details}
                salary={salary}
                mobile={mobile}
              />
            }
          />
        </Skeleton>
      </Card>
    )
  }
}

export default CardItem