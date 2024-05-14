import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({user, updateUser}) {

  function handleLogOut(){
    userService.logOut()
    updateUser(null)
  }

  return (
    <div className="navbar-parent"> 
      <nav className='navbar' 
      // style={{ position: 'fixed', width: '100%', zIndex: 100, top: 0, backgroundColor: 'whitesmoke', textAlign: 'left', paddingLeft: '2rem'  }}
      >
      <Link to="/orderstatus" className='navbar-link'>Orders</Link>
      {/* &nbsp; | &nbsp; */}
      <Link to="/"  className='navbar-link'>Home</Link>
      {/* &nbsp; | &nbsp; */}
      <Link to="/cart"  className='navbar-link'>Cart</Link>
      {/* &nbsp; | &nbsp; */}
      <Link to='' onClick={handleLogOut}  className='navbar-link'>Log Out</Link>
    </nav>
    </div>
  )
}

