import { Button, Input, Form } from 'antd';
import React from 'react';
import styles from '../style.less';

const { TextArea } = Input;
// 输入框&提交按钮
const Editor = ({ onChange, onSubmit, submitting, value, label, row }) => (
  <div className={styles.editorBox}>
    <Form.Item style={{ marginBottom: 0 }} label={label}>
      <TextArea rows={row || 4} onChange={onChange} value={value} placeholder="大人，来说句话吧！"/>
    </Form.Item>
    <Form.Item style={{ marginBottom: 0 }}>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" size="small">
        提交
      </Button>
    </Form.Item>
  </div>
);

export default Editor;
