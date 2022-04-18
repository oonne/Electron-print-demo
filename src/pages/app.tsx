import React, { FC } from 'react';
import ErrorBoundary from './error-boundary';
import Router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </ErrorBoundary>
  );
};
export default App;
