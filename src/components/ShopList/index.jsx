import { Col, Icon, Row, Tooltip, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import styles from './style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const ShopList = ({ onClick, list = [], loading }) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding: 0,
      marginTop: 24,
      backgroundColor: '#f0f2f5'
    }}
  >
    <Row gutter={24} type="flex">
      {list.map((item, index) => {
        const {
          _id,
          providerId,
          createTime,
          title,
          imgs,
          inventory,
          price,
          address,
          mobile,
          introduce,
          description,
        } = item
        return (
          <Col {...topColResponsiveProps}>
            <Card
              cover={
                <div className={styles.shopItemImg}>
                  <a onClick={() => onClick(_id)}><img alt={title} src={imgs[0].src} /></a>
                </div>
              }
            >
              <Card.Meta
                title={<div className={styles.shopItemTitle}><a onClick={() => onClick(_id)}>{title}</a></div>}
                description={
                  <div className={styles.shopItemDescription}>
                    <span>{description}</span>
                  </div>
                }
              />
              <div className={styles.shopItemPrice}>
                <span>{price}</span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  </Card>
)

export default ShopList;
