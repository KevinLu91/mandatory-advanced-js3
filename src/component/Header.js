import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component{
  render(){
    return(
      <nav>
        <Link className='headerLinks' to='/Login' ><h3>Login Page</h3></Link>
        <Link className='headerLinks' to='/Registration' ><h3>Registration Page</h3></Link>
      </nav>
    )
  }
}

export default Header;
