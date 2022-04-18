import React, { FC, useState, useEffect } from 'react';
import { Layout, Modal, Button, message } from 'antd';
import Header from './components/header';
import Printer from './components/printer';
import { PrinterList } from './type';

import './index.less';

/*
 * 订单列表
 */
let printers: PrinterList = [];
const OrderListPage: FC = () => {
  const [printing, setPringing] = useState(false);

  /* 获取打印机列表 */
  const getPrinters = () => {
    if (!(window as any).electron) {
      return;
    }

    const ipc = (window as any).electron.ipcRenderer;
    ipc.on('setPrinters', (_e, arg) => {
      printers = arg
        .filter(p => p.status == 0)
        .map(p => {
          return {
            name: p.name,
            label: p.name,
          };
        });
    });
    ipc.send('getPrinters');
  };
  useEffect(() => {
    getPrinters();
  }, []);

  /* 选择打印机 */
  const showPrinter = () => {
    Modal.info({
      title: '选择打印机',
      icon: null,
      content: <Printer printers={printers} />,
      okText: '确定',
    });
  };

  /* 开始打印 */
  const onPrint = async () => {
    if (!(window as any).electron) {
      message.error('请在Electron中运行');
      return;
    }

    // 如果没选打印机，先选打印机
    if (!localStorage.printer) {
      showPrinter();
      return;
    }

    setPringing(true);

    const ipc = (window as any).electron.ipcRenderer;

    // 开始打印
    ipc.send('printTask', {});

    // 监听打印完成
    ipc.removeAllListeners('onPrintSuccess');
    ipc.on('onPrintSuccess', () => {
      setPringing(false);
      message.success('打印完成');
    });
  };

  /* 主界面 */
  return (
    <Layout>
      <Header onSelectPrinter={showPrinter} />
      <Layout.Content className="content center">
        <Button onClick={onPrint} loading={printing}>
          打印
        </Button>
      </Layout.Content>
    </Layout>
  );
};

export default OrderListPage;
