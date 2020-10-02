/**
 * Card底部查看详情组件 
 **/ 
import React, { Component } from 'react';

class CardFooterButton extends Component {
  render() {
    const {
      onClick,
    } = this.props
    return (
      <a onClick={onClick}>查看详情</a>
    )
  }
}

export default CardFooterButton