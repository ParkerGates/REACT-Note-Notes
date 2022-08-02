import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import Logo from "../Logo/Logo";
import "./Navs.css";



export default function NavBar() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [showNav, setShowNav] = useState<boolean>(false);

    const onNavigation = () => setShowNav(false);

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        setShowNav(false);
      }
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    },[]);


    if ( windowDimensions.width >= 750) {
        return (
            <nav className="navBarContainer navPadding">
                <Link to="/"><Logo size="Small" width="45px"/></Link>

                <hr className="hrNB"/>

                <div className="navBarItems">
                    <NavLink to="/about" className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>About</NavLink>
                    <NavLink to="/setup" className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Flashcard</NavLink>
                    <NavLink to="/review" className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Review</NavLink>
                    <NavLink to="/showcase" className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Showcase</NavLink>
                </div>

                <hr className="hrNB" />

                <Link to="/profile">
                    <div className="profileButton">Profile</div>
                </Link>
            </nav>
        );
    }
    else {
        return (
            <div className="navPadding">
                <nav className="navMobileContainer" style={{height: `${showNav === false ? "50px" : "calc(100vh - 40px)"}`}} >
                    <div className="navMobileTopContainer">
                        <button className="hamBtn" onClick={()=>setShowNav(!showNav)}><i className="fa fa-bars ham"></i></button>
                        <Link to="/" onClick={onNavigation}><Logo size="Small" width="40px"/></Link>
                        <Link to="/profile" onClick={onNavigation}><i className="fa fa-user-circle navMobileProfile" aria-hidden="true"></i></Link>
                    </div>

                    <div>
                        <i className="fa fa-home navMobileIconSpace" aria-hidden="true"></i>
                        <NavLink to="/" onClick={onNavigation} className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Home</NavLink>
                    </div>
                    <div>
                        <i className="fa fa-question-circle-o navMobileIconSpace" aria-hidden="true"></i>
                        <NavLink to="/about" onClick={onNavigation} className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>About</NavLink>
                    </div>
                    <div>
                        <i className="fa fa-th-large navMobileIconSpace" aria-hidden="true"></i>
                        <NavLink to="/setup" onClick={onNavigation} className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Flashcards</NavLink>
                    </div>
                    <div>
                        <i className="fa fa-graduation-cap navMobileIconSpace" aria-hidden="true"></i>
                        <NavLink to="/review" className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Review</NavLink>
                    </div>
                    <div>
                        <i className="fa fa-eye navMobileIconSpace" aria-hidden="true"></i>
                        <NavLink to="/showcase" onClick={onNavigation} className={({ isActive }) => isActive?"activeNavBarItem":"navBarItem"}>Showcase</NavLink>
                    </div>
                </nav>
            </div>
        );
    }
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }