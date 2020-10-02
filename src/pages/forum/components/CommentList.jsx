import { Icon, List, Comment, Tooltip, Pagination } from 'antd';
import React, { PureComponent } from 'react';
import styles from '../style.less';
import moment from 'moment';
import CommentChildList from './CommentChildList'

class CommentList extends PureComponent {

  state = {
    value: '',//输入框的值
    submitting: false,//按钮状态
    editorCommentId: null,//回复的目标评论的Id
  }

  //输入框输入时
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  //点击提交评论
  handleSubmit = (questionId, commentId, parentCommentId, targetUserId) => {
    const { value } = this.state
    const { onSubmitComment } = this.props
    this.setState({
      submitting: true,
    })
    const newValue = value.replace(/\回复(.*?)\：/, "")
    onSubmitComment(questionId, commentId, parentCommentId, targetUserId, newValue, () => {
      this.setState({
        submitting: false,
        value: '',
      })
    })
  }

  // 点击回复或收起回复
  handleClickComment = (questionId, id) => {
    const { editorCommentId } = this.state
    const { handleClickLookComment } = this.props
    if (editorCommentId === null) {
      this.setState({
        editorCommentId: id,
        value: '',
      })
      handleClickLookComment(questionId, id)
    } else if (editorCommentId === id) {
      this.setState({
        editorCommentId: null,
        value: '',
      })
    } else {
      this.setState({
        editorCommentId: id,
        value: '',
      })
      handleClickLookComment(questionId, id)
    }
  }

  //点击回复
  handleClickReply = (userName) => {
    this.setState({
      value: `回复 ${userName}：`
    })
  }

  render() {
    const { value, submitting, editorCommentId } = this.state
    const {
      list,
      childComments,
      pagination,
      onPageChange,
    } = this.props
    const {
      total,
      totalPage,
      currentPage,
      pageSize,
    } = pagination
    return (
      <>
        <List
          className="comment-list"
          itemLayout="horizontal"
          // locale={{
          //   emptyText: '暂无回答'
          // }}
          dataSource={list}
          renderItem={item => {
            const {
              _id,
              questionId,
              userId,
              targetUserId,
              parentId,
              parentCommentId,
              content,
              createTime,
              avatar,
              name,
              userName,
              childCommentsNums,
            } = item
            return (
              <li className={styles.commentItem} key={_id} >
                <Comment
                  actions={[
                    <span onClick={() => this.handleClickComment(questionId, _id)}
                    >
                      <Icon type="message" style={{ marginRight: 5 }} />
                      {editorCommentId === _id ? '收起评论' : '查看评论'}{`(${childCommentsNums})`}
                    </span>,
                  ]}
                  author={name || userName}
                  avatar={avatar}
                  content={<p>{content}</p>}
                  datetime={(
                    <Tooltip title={moment(createTime).format('YYYY-MM-DD HH:mm:ss')}>
                      <span>
                        {moment(createTime).fromNow()}
                      </span>
                    </Tooltip>
                  )}
                />
                {
                  editorCommentId === _id ? (
                    <CommentChildList
                      list={childComments}
                      onChange={this.handleInputChange}
                      onSubmit={(targetUserId) => this.handleSubmit(questionId, _id, _id, targetUserId)}
                      handleClickReply={this.handleClickReply}
                      submitting={submitting}
                      value={value}
                      row={1}
                    />
                  ) : null
                }

              </li>
            )
          }}
        />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={page => {
              onPageChange(page)
            }}
            pageSize={pageSize}
            current={currentPage}
          />
        </div>
      </>
    );
  }
}

export default CommentList;
