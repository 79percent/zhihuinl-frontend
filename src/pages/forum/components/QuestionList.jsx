import React, { useState } from 'react';
import { List, Avatar, Icon } from 'antd';
import styles from '../style.less';
import moment from 'moment'

export default ({ list = [], onClick, onPageChange, pagination }) => {
  const [imgWidth, setImgWidth] = useState(100);
  const [choosedImgsrc, setChoosedImgsrc] = useState(null);

  //回复次数
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  //点击图片
  const handleImgClick = (src) => {
    setChoosedImgsrc(src)
    setImgWidth(imgWidth === 100 ? 250 : 100)
  }

  const { currentPage, pageSize, total, totalPage } = pagination
  return (
    <List
      itemLayout="horizontal"
      // itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          onPageChange(page)
        },
        total,
        pageSize,
        current: currentPage,
      }}
      dataSource={list}
      renderItem={(item, index) => {
        const {
          _id,
          userId,
          title,
          description,
          imgs,
          createTime,
          avatar,
          commentsNum,
        } = item
        return (
          <List.Item
            key={_id}
            actions={[
              <span>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</span>,
              <IconText type="message" text={commentsNum} key="list-vertical-message" onClick={() => onClick(_id)} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar} />}
              title={<a onClick={() => onClick(_id)}>{title}</a>}
              description={
                <>
                  <p>{description}</p>
                  {Array.isArray(imgs) && imgs.map(item => {
                    const { id, src } = item
                    return (
                      <a onClick={() => handleImgClick(src)} >
                        <img
                          className={imgWidth === 100 || choosedImgsrc !== src ? styles.imgCursorMax : styles.imgCursorMin}
                          key={id}
                          style={{ marginRight: 10 }}
                          width={choosedImgsrc === src ? imgWidth : 100}
                          src={src}
                        />
                      </a>
                    )
                  })}
                </>
              }
            />
          </List.Item>
        )
      }}
    />
  )
};
