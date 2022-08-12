import { Link, Outlet } from 'react-router-dom'
import Button from '../Button/Button'
import useAuth from '../hooks/useAuth'

import Authenticated from '../Permission/Authenticated'
// import useAuth from '../hooks/useAuth'
import NotAuthenticated from '../Permission/NotAuthenticated'
function MainRoute() {
    const { user, isAuthenticated } = useAuth()

    return (
        <div className="MainRoute">
            <div className='MainRoute-navbar'>
                <div className="MainRoute-logo">
                    MindX Images
                </div>

                {/* Cách 1 */}

                <NotAuthenticated>
                    <div>
                        <Link to='/login'>
                            <Button label='Login'></Button>
                        </Link>

                        <Link to='/signup'>
                            <Button>SignUp</Button>
                        </Link>
                    </div>
                </NotAuthenticated>
                {/* children as function */}
                <Authenticated>         
                    {user => (
                        <div>Welcome {user.data.username}
                        <Link  to='posts/create'>
                            Create post
                        </Link>
                        </div>
                        
                    )}
                </Authenticated>

                {/* Cách 2 */}

                {/* {!isAuthenticated?(<div>
                   <Link to='/login'>Login</Link>
                   <Link to='/signup'>Signup</Link> 

            </div>):(
                <div>Welcome {user.data.username}</div>
            )}  */}
            </div>
            <div className='MainRoute-content'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default MainRoute