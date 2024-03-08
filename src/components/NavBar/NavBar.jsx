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
    <nav style={{ position: 'fixed', width: '100%', zIndex: 100, top: 0, backgroundColor: 'white', textAlign: 'left', paddingLeft: '2rem'  }}>
      <Link to="/orderstatus">Orders</Link>
      &nbsp; | &nbsp;
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/cart">Cart</Link>
      &nbsp; | &nbsp;
      <Link to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
    </div>
  )
}

