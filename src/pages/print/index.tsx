import React, { FC, useEffect, useState } from 'react';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Utils } from '../../utils';
import Label from './components/label';
import { RenderingStatus } from './type';

import './index.less';

/* 打印控制 */
const PrintDeliveryLabel: FC = () => {
  /* 查询订单 */
  const [rendingStatus, setRendingStatus] = useState(RenderingStatus.preparing);

  /* 通过接口请求打印数据 */
  const queryData = async (params: any) => {
    setRendingStatus(RenderingStatus.requesting);

    // 此处写请求代码
    console.log('请求打印数据', params);
    await Utils.wait(100);

    setRendingStatus(RenderingStatus.rendering);
  };

  /* 监听打印信号 */
  const listenPrintParams = () => {
    if (!(window as any).electron) {
      return;
    }

    const ipc = (window as any).electron.ipcRenderer;
    ipc.removeAllListeners('setPrintParams');
    ipc.on('setPrintParams', (_e, params) => {
      queryData(params);
    });
  };

  /* 渲染完成回调 */
  const onRendered = () => {
    if (!(window as any).electron) {
      return;
    }

    const ipc = (window as any).electron.ipcRenderer;
    ipc.send('print');
  };

  /* 打印完成的回调 */
  const listenPrintComplete = () => {
    if (!(window as any).electron) {
      return;
    }

    const ipc = (window as any).electron.ipcRenderer;
    ipc.removeAllListeners('printComplete');
    ipc.on('printComplete', async () => {
      await Utils.wait(1000);
      setRendingStatus(RenderingStatus.preparing);
    });
  };

  /* 监听状态变化 */
  useEffect(() => {
    if (rendingStatus === RenderingStatus.preparing) {
      // 监听打印信号
      listenPrintParams();
    }

    if (rendingStatus === RenderingStatus.rendering) {
      listenPrintComplete();
    }
  }, [rendingStatus]);

  /* 尚未收到打印信号 */
  if (rendingStatus === RenderingStatus.preparing) {
    return <Empty description="等待打印信号" />;
  }

  /* 请求数据中 */
  if (rendingStatus === RenderingStatus.requesting) {
    return (
      <div className="print-loading">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );
  }

  /* 渲染 */
  return <Label onRendered={onRendered} />;
};

export default PrintDeliveryLabel;
