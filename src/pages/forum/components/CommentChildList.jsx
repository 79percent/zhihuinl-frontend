import { Button, Input, Form, Avatar } from 'antd';
import React, { PureComponent } from 'react';
import styles from '../style.less';
import moment from 'moment';

const { TextArea } = Input;

class CommentChildList extends PureComponent {
  state = {
    targetUserId: null,
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      const reg = /\回复(.*?)\：/;
      if(!reg.exec(value)){
        this.setState({
          targetUserId: null,
        })
      }
    }
  }

  setTargetUserId = (targetUserId) => {
    this.setState({
      targetUserId
    })
  }

  render() {
    const {
      list, onChange, onSubmit, submitting, value, label, row, handleClickReply
    } = this.props
    const { targetUserId } = this.state
    return (
      <div className={styles.editorBox}>
        {list.map((item, index) => {
          const {
            _id,
            questionId,
            userId,
            parentId,
            content,
            createTime,
            avatar,
            name,
            userName,
            targetUserId,
            targetAvatar,
            targetName,
            targetUserName,
          } = item
          return (
            <div style={{ marginBottom: 0, fontSize: 12 }} key={_id}>
              <div>
                <Avatar src={avatar} />
                <a style={{ color: '#2d64b3', marginLeft: 10 }}>{name || userName}</a>
                {targetUserId ? (
                  <>
                  <span style={{marginLeft: 10}}>回复</span>
                  <a style={{ color: '#2d64b3', marginLeft: 10 }}>{targetName || targetUserName}</a>：
                  </>
                ) : "："}
                {content}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 12 }}>
                <span style={{ marginRight: 10 }}>{moment(createTime).fromNow()}</span>
                <a onClick={() => {
                  handleClickReply(name || userName)
                  this.setTargetUserId(userId)
                }}>回复</a>
              </div>
            </div>
          )
        })}
        <Form.Item style={{ marginBottom: 0 }} label={label}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextArea rows={row || 4} onChange={onChange} value={value} style={{ width: 600, marginRight: 10 }} />
            <Button htmlType="submit" loading={submitting} onClick={() => onSubmit(targetUserId)} type="primary" >
              提交
            </Button>
          </div>
        </Form.Item>
      </div>
    )
  }
}

export default CommentChildList
