import { Col, Icon, Row, Tooltip, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import styles from '../style.less';

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

const ShopList = ({ loading, visitData }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        cover={
          <div className={styles.shopItemImg}>
            <img alt="这是img的alt" src="https://yanxuan-item.nosdn.127.net/55fefb8e48154e1f8e847c0c4cf11a9b.png?imageView&thumbnail=260x260&quality=95" />
          </div>
        }
      >
        <Card.Meta
          title={<div className={styles.shopItemTitle}><a >网易味央黑猪肉香肠 350g</a></div>}
          description={
            <div className={styles.shopItemDescription}>
              <span>新世界经典混酿代表</span>
            </div>
          }
        />
        <div className={styles.shopItemPrice}>
          <span>94.5</span>
        </div>
      </Card>
    </Col>
  </Row>
);

export default ShopList;
