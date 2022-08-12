// import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ListPost from './pages/ListPost/ListPost';
// import Login from '../src/components/Login/Login.js'
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import DetailPost from './pages/DetailPost/DetailPost';
import axios from './api/request';
import CreatePost from './pages/CreatePost/CreatePost';
import PrivateRoute from './components/Route/PrivateRoute';
import GuestRoute from './components/Route/GuestRouter';
import MainRoute from './components/Route/MainRoute';
// import PrivateRoute from 
const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const ListPost = lazy(() => import('./pages/ListPost/ListPost'));
// import { useSelector, useDispatch } from 'react-redux';

export const AuthContext = React.createContext(); //chuyền sang cái khác
function App() {

  const [userInfo, setUserInfo] = React.useState({
    status: 'idle',
    data: null
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const verifyUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserInfo({ status: 'success', data: null });
      return;
    }
    try {
      const res = await axios.get('/api/auth/verify');
      if (res.data.success) {
        setUserInfo({ status: 'success', data: res.data });
      } else {
        setUserInfo({ status: 'success', data: 456 })
      }
    } catch (error) {
      setUserInfo({ status: 'success', data: 789 })
    }
  }

  React.useEffect(() => {
    verifyUserInfo();
  }, []);

  if (userInfo.status === "idle" || userInfo.status === "loading") return <div>Loading...</div>;

  if (userInfo.status === "error") return <div>Error</div>

  const login = ({ token, returnUrl }) => {
    localStorage.setItem('token', token);
    // navigate('/')
    window.location.href = returnUrl ?? '/' // ?? gần giống ||, kiểu nếu không có returnUrl thì trả về trang home 
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUserInfo({ status: 'success', data: null });
  }

  return (

    <AuthContext.Provider value={{ user: userInfo.data, login, logout }}>
      {/* // <ListPost></ListPost> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainRoute />}>
            <Route path='' element={<ListPost />} />
            <Route path='posts/:postId' element={<DetailPost />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="posts/create" element={<CreatePost />} />
            </Route>
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path='*' element={<div>404 PAGE</div>} />
        </Routes>

      </Suspense>
    </AuthContext.Provider>
  )

}

export default App;

