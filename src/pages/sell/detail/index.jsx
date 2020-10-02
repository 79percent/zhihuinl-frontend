/**
 * 滞销求购产品详情页面
 */
import { Button, Card, Icon, List, Typography, Modal, Spin } from 'antd';
import React, { Component, Suspense } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from '../style.less';
import HeaderContent from '@/components/HeaderContent'
import ShopList from '@/components/ShopList'
import PageLoading from '../components/PageLoading'
import finger from '@/assets/finger.svg'

const { Paragraph, Title, Text } = Typography;

@connect(({ sell, loading }) => ({
  detail: sell.detail,
  loading: loading.effects['sell/getProductDetail'],
}))
class SellDetail extends Component {

  state = {
    visible: false,
    choosedImgIndex: null,
  }

  componentDidMount() {
    const { location, dispatch } = this.props
    const { query } = location
    dispatch({
      type: 'sell/getProductDetail',
      payload: {
        _id: query.id
      },
    });
  }

  //图片的弹窗
  handleVisible = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  //点击下方图片列表
  handleClickImgList = (index) => {
    this.setState({
      choosedImgIndex: index
    })
  }

  render() {
    const { loading, detail } = this.props
    const { choosedImgIndex, visible } = this.state
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
    } = detail
    return (
      <PageHeaderWrapper>
        <Spin spinning={loading}>
          <div className={styles.cardList}>
            <div style={{
              marginTop: 24,
            }}>
              <div className={styles.detailContent}>
                <div className={styles.left}>
                  <div className={styles.imgShow}>
                    <a>
                      <img src={imgs && imgs[choosedImgIndex || 0].src} alt="" onClick={this.handleVisible} />
                    </a>
                  </div>
                  <div className={styles.imgList}>
                    <ul>
                      {imgs && imgs.map((item, index) => {
                        const { src } = item
                        if (index < 4) {
                          return (
                            <li style={index === 0 ? { marginLeft: 0 } : null}>
                              <a>
                                <img
                                  style={index === choosedImgIndex ? { borderWidth: 3, borderColor: '#b4a078', borderStyle: 'solid' } : null}
                                  src={src}
                                  alt=""
                                  onClick={() => this.handleClickImgList(index)}
                                />
                              </a>
                            </li>
                          )
                        }
                        return null
                      })}
                    </ul>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.description}>{description}</div>
                  <div className={styles.content}>
                    <div className={styles.row}>
                      <span className={styles.lebel}>价格</span>
                      <span className={styles.yuanIcon}>￥</span>
                      <span className={styles.price}>{price}</span>
                      <span className={styles.value}>/斤</span>
                    </div>
                    <div className={styles.row}>
                      <span className={styles.lebel}>地址</span>
                      <span className={styles.value}>{address}</span>
                    </div>
                    <div className={styles.row}>
                      <span className={styles.lebel}>库存</span>
                      <span className={styles.value}>{inventory}斤</span>
                    </div>
                  </div>
                  <div className={styles.footer}>
                    <Button type="primary" icon="phone" size="large" style={{ width: 200, height: 80, backgroundColor: '#05ca05' }}>
                      <span className={styles.mobile}>{mobile}</span>
                    </Button>
                    <span className={styles.fingerAndText}>
                      <img src={finger} alt="" />
                    联系方式
                  </span>
                  </div>
                </div>
              </div>
              <Card type="inner" title="产品介绍" >
                {introduce}
              </Card>
            </div>
          </div>
          <Modal
            visible={visible}
            footer={null}
            onCancel={this.handleVisible}
            closeIcon={<Icon type="close-circle" theme="filled" style={{ position: 'absolute', top: 10, right: 10 }} />}
          >
            <img alt="example" style={{ width: '100%' }} src={imgs && imgs[choosedImgIndex || 0].src} />
          </Modal>
        </Spin>
      </PageHeaderWrapper >
    );
  }
}

export default SellDetail;
