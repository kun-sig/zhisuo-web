import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';

// 自定义菜单项类型
type CustomMenuItem = NonNullable<MenuProps['items']>[number] & {
  path?: string;
  children?: CustomMenuItem[];
};

// 菜单数据
const items: CustomMenuItem[] = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: '资源中心',
    children: [
      { key: '11', label: '课程管理', path: '/admin/curriculum' },
      { key: '12', label: '权限管理', path: '/admin/curriculum/permission' },
    ],
  },
  {
    key: '2',
    icon: <UsergroupAddOutlined />,
    label: '用户中心',
    children: [
      { key: '21', label: '用户管理', path: '/admin/user/overview' },
      { key: '23', label: '用户角色', path: '/admin/user/role' },
      { key: '22', label: '角色管理', path: '/admin/user/roleManager' },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      { key: '31', label: 'Option 1', path: '/option31' },
      { key: '32', label: 'Option 2', path: '/option32' },
    ],
  },
];

// 获取所有需要展开的 keys
const getAllOpenKeys = (items: CustomMenuItem[]): string[] => {
  const keys: string[] = [];
  const traverse = (menuItems: CustomMenuItem[]) => {
    menuItems.forEach(item => {
      if (item.children && item.children.length > 0) {
        if (item.key) {
          keys.push(String(item.key));  // 转字符串
        }
        traverse(item.children);
      }
    });
  };
  traverse(items);
  return keys;
};

const allOpenKeys = getAllOpenKeys(items);

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(allOpenKeys);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    setStateOpenKeys(openKeys); // 直接更新所有展开项
  };

  const onClick: MenuProps['onClick'] = (e) => {
    const findItem = (items: CustomMenuItem[], key: string): CustomMenuItem | null => {
      for (const item of items) {
        if (item.key === key) return item;
        if (item.children) {
          const found = findItem(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const item = findItem(items, e.key);
    if (item?.path) {
      navigate(item.path);
    }
  };


  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['11']}
      defaultOpenKeys={['1', '2', '3']} // 默认展开这三个一级菜单
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      style={{ width: 256, height: '100%', borderRight: 0 }}
      items={items as MenuProps['items']}
    />
  );
};

export default Navigation;
