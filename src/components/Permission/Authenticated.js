import useAuth from '../hooks/useAuth'

function Authenticated({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        console.log('asd',user)
        return children(user);
    }

    return null
}

export default Authenticated;