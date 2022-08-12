import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '../../components/hooks/useAuth'

//Outlet có giá trị là element có path tương ứng nằm giữa thằng guestRoute, k có thì vẫn chạy đc
export default function GuestRoute() {
   const {user}= useAuth()
  if (user) return <Navigate to={'/'} replace />

  return <Outlet />
}