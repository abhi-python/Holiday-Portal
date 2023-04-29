import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import logoImage from "./unnamed.png"
import { UserContext } from "../App";

const Nav = () => {

  const {state} = useContext(UserContext)
  const { value } = useLocation();
  const RenderMenu = () =>{
    if(state){
      return (
      <>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <h1>{value}</h1>
                  <Link className="nav-link" to={'/sign-in'}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
      </>
      )
    }else {
      return (
        <>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
        </>
      )
    }
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              <img src={logoImage} alt="logo"></img>
            </Link>
            <RenderMenu />
          </div>
        </nav>
    </div>
  )
}

export default Nav;