import { Typography } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import { highLightKeyword } from '../../../utils/utils'

const { Paragraph } = Typography

const ArticleListContent = ({ data: { content, createTime, href }, keyword }) => (
  <div className={styles.listContent}>
    <Paragraph className={styles.description} ellipsis={{ rows: 3 }}>{highLightKeyword(content, keyword)}</Paragraph>
    <div className={styles.extra}>
      <span>{moment(createTime).format('YYYY-MM-DD HH:mm')}</span>
      <em><a href={href} target="_blank">{href}</a></em>
    </div>
  </div>
);

export default ArticleListContent;
