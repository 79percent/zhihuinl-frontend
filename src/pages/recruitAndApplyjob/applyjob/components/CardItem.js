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
      city,//城市
      age,//年龄
      speciality,//特长/工作经历
      name,//称呼
      mobile,//联系方式
      workExperience,//工作经验/年
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
                city={city}
                age={age}
                speciality={speciality}
                name={name}
                mobile={mobile}
                workExperience={workExperience}
              />
            }
          />
        </Skeleton>
      </Card>
    )
  }
}

export default CardItem