import React from 'react';
import { Spin } from 'antd'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

export default ({ loading }) => (
  <div
    style={{
      paddingTop: 100,
      textAlign: 'center',
    }}
  >
    <Spin size="large" spinning={loading} />
  </div>
);
