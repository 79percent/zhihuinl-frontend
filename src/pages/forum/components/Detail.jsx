import { Icon, List, Modal, Comment, Tooltip } from 'antd';
import React, { Component } from 'react';
import styles from '../style.less';
import moment from 'moment';

class SellDetail extends Component {

  state = {
    visible: false, //弹窗显隐
    choosedImgSrc: null,//点击的图片src
  }

  //图片的弹窗
  handleVisible = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  //点击图片，展示大图
  handleClickImg = (src) => {
    const { visible } = this.state
    this.setState({
      choosedImgSrc: src,
      visible: !visible
    })
  }

  render() {
    const { visible, choosedImgSrc } = this.state
    const { data, currentPage } = this.props
    return (
      <>
        {
          currentPage == 1 ? (
            <>
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={[data]}
                renderItem={item => {
                  const {
                    _id,
                    userId,
                    title,
                    description,
                    imgs,
                    createTime,
                    avatar,
                    name,
                    userName,
                  } = item || {}
                  return (
                    <li className={styles.commentItem} key={_id} >
                      <Comment
                        author={name || userName}
                        avatar={avatar}
                        content={
                          (
                            <>
                              <p>{description === "" ? title : description}</p>
                              {Array.isArray(imgs) ? (
                                imgs.map((item, index) => {
                                  const { id, src } = item
                                  return (
                                    <a key={id} onClick={() => this.handleClickImg(src)}>
                                      <img
                                        style={{ marginRight: 10 }}
                                        width={125}
                                        src={src}
                                      />
                                    </a>
                                  )
                                })
                              ) : null}
                            </>
                          )
                        }
                        datetime={(
                          <Tooltip title={moment(createTime).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>
                              {moment(createTime).fromNow()}
                            </span>
                          </Tooltip>
                        )}
                      />
                    </li>
                  )
                }}
              />
              <Modal
                style={{ top: 20, padding: 0 }}
                visible={visible}
                footer={null}
                onCancel={this.handleVisible}
                closeIcon={<Icon type="close-circle" theme="filled" style={{ position: 'absolute', top: 10, right: 10 }} />}
              >
                {choosedImgSrc ? <img alt="example" style={{ width: '100%' }} src={choosedImgSrc} /> : null}
              </Modal>
            </>
          ) : null
        }
      </>
    );
  }
}

export default SellDetail;
