import { Outlet, Navigate, useLocation } from 'react-router-dom'
import React from 'react';
import useAuth from '../../components/hooks/useAuth'

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location =useLocation();  //bắt đầu bước  để ví dụ đang ở trang nào mà phải ra đăng nhập thì quay trở lại trang đó khi đăng nhập xong
  if (!isAuthenticated) return <Navigate to={`login?returnUrl=${location.pathname}`} />
  
  return <div style={{padding:30}}><Outlet></Outlet></div>
}