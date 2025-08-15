import { Button } from 'antd';
import React, { useState } from 'react';
import LoginModal from '../pages/login/loginModal';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div className='h-full w-full'>
      <div className='h-[64px] w-full bg-white flex justify-end items-center border-b border-gray-100'>
        <Button color="default" variant="solid" onClick={handleClick}>
          登录
        </Button>
      </div>
      <LoginModal open={open} onOpenChange={()=>{
        setOpen(!open)
      }}></LoginModal>
    </div>

  );
};

export default Header;