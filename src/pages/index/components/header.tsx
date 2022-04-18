import React, { FC } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

interface Props {
  onSelectPrinter: any;
}

/* 头部 */
const Header: FC<Props> = (props: Props) => {
  // 设置菜单
  const menu = () => {
    return (
      <Menu>
        <Menu.Item key="printer" onClick={props.onSelectPrinter}>
          选择打印机
        </Menu.Item>
      </Menu>
    );
  };

  // 头部
  return (
    <Layout.Header className="header">
      <Dropdown.Button
        trigger={['click']}
        type="text"
        icon={<SettingOutlined className="setting-icon" />}
        overlay={menu}
      />
    </Layout.Header>
  );
};

export default Header;
