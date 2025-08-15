import type { CSSProperties } from "react";

export const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

export const contentStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  width: '1500px',
  margin: '0 auto',
};

export const bodyStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#0958d9',
  color: '#fff',
  margin: '0 auto',
};

export const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

export const logoStyle: CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
};

export const loginButtonStyle: CSSProperties = {
  marginLeft: 'auto', // 强制按钮贴到最右边
  backgroundColor: '#00ffff',
  border: 'none',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};