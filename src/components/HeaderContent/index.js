/**
 * 面包屑下面的头部组件 
 **/
import React, { Component } from 'react';
import styles from '@/styles/style.less';

class HeaderContent extends Component {
  render() {
    const { text = "" } = this.props
    return (
      <div className={styles.pageHeaderContent}>
        <p>
          {text}
        </p>
      </div>
    )
  }
}

export default HeaderContent