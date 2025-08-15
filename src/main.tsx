import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import './App.css'
import { RouterProvider } from 'react-router';
import { Router } from './routes/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={Router} />
  </StrictMode>,
)
