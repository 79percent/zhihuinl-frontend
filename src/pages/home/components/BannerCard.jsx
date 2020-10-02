/**
 * 首页-轮播图&农业资讯板块
 */
import { Card, Col, Icon, Row, Carousel } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import styles from '../style.less';

const activeColorMap = [
  styles.activeOne,
  styles.activeTwo,
  styles.activeThree,
]

const fireColorMap = [
  { color: "#f54545" },
  { color: "#ff8547" },
  { color: "#ffac38" },
]

export default class BannerCard extends Component {
  render() {
    const {
      loading,
      list = [],
    } = this.props
    return (
      <Card
        loading={loading}
        bordered={false}
        bodyStyle={{
          padding: 0,
          paddingTop: 20,
        }}
      >
        <div className={styles.salesCard}>
          <Row type="flex">
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Carousel autoplay>
                  {list.map((item, index) => {
                    if (index > 3)
                      return null
                    const {
                      content,
                      createTime,
                      href,
                      img,
                      providerId,
                      tags,
                      title,
                    } = item
                    return (
                      <div className={styles.bannerBox}>
                        <div className={styles.title}>
                          <span>{title}</span>
                        </div>
                        <a target="_blank" href={href}>
                          <img src={img} />
                        </a>
                      </div>
                    )
                  })}
                </Carousel>
              </div>
            </Col>
            <Col xl={10} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h3 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.agricultural-information"
                    defaultMessage="Sales Ranking"
                  />
                </h3>
                <ul className={styles.rankingList}>
                  {list.map((item, i) => {
                    if (i > 7) {
                      return null
                    }
                    const {
                      content,
                      createTime,
                      href,
                      img,
                      providerId,
                      tags,
                      title,
                    } = item
                    return (
                      (
                        <li key={item.title}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? activeColorMap[i] : styles.active}`}>
                            {i + 1}
                          </span>
                          <a target="_blank" href={href}>
                            <span className={styles.rankingItemTitle} title={title} style={{display: 'inline-block', width: '18rem'}}>
                              {title}
                            </span>
                          </a>
                          {i < 3 ? <span className={styles.fireIcon}><Icon type="fire" theme="filled" style={fireColorMap[i]} /></span> : null}
                        </li>
                      )
                    )
                  })}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}




