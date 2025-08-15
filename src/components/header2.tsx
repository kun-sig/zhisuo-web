import { Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { userAPI } from '../services/user';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (userAPI.logged()) {
      const info = userAPI.loggedInfo;
      setUsername(info?.user?.fullName || info?.user?.phone || '用户');
    }
  }, []);

  const handleLogout = () => {
    userAPI.logout();
    setUsername(null);
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/admin');
  };

  const menuItems = [
    {
      key: 'logout',
      label: <span onClick={handleLogout}>退出登录</span>,
    },
  ];

  return (
    <div className='h-[64px] w-full bg-white flex justify-end items-center border-b border-gray-100'>
      <div className='mr-12'>
        {username ? (
          <Dropdown menu={{ items: menuItems }}
            placement="bottomRight">
            <Button  color="default" variant="link">用户：{username}</Button>
          </Dropdown>
        ) : (
          <Button onClick={handleLoginClick}>登录</Button>
        )}
      </div>
    </div>
  );
};

export default Header;