import useAuth from '../hooks/useAuth'

function NotAuthenticated({children}){    //children là cái nằm trong component be
  const { isAuthenticated } = useAuth()

  if(!isAuthenticated){
    return children;
  }
  return null
}

export default NotAuthenticated;