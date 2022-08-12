import { Outlet, Navigate } from 'react-router-dom'
import React from 'react';
import { AuthContext } from '../../App'
//sử dụng cơ chế custom Hook
function useAuth() {
    const { user,login,logout } = React.useContext(AuthContext) //lấy từ app.js
    const isAuthenticated = !!user;
    return {
        user,login,logout, isAuthenticated
    }
}
export default useAuth;

