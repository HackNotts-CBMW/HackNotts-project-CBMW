import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Nav = ({ userLoggedIn, setUserLoggedIn }) => {
  const [navStatus, setNavStatus] = useState(false)
    const navigate = useNavigate()

  return (
    <>
      <div onClick={() => setNavStatus(!navStatus)} className='nav-mobile'>
          <div className='nav-mobile-logo' onClick={() => userLoggedIn ? navigate("/dashboard") : navigate("/login")}>
            <h1 className='nav-mobile-logo-heading'>CBMW</h1>
          </div>
          <div className='nav-mobile-burger'>
            <span className='nav-mobile-item'></span>
            <span className='nav-mobile-item'></span>
            <span className='nav-mobile-item'></span>
          </div>
        </div>
        
        <div className={navStatus ? `nav open` : `nav`}>
          <div className='nav-logo' onClick={() => userLoggedIn ? navigate("/dashboard") : navigate("/login")}>
            <h1 className='nav-logo-heading'>CBMW</h1>
          </div>

          <div className='nav-list'>
            <ul className='nav-list-container'>
              <li className='nav-list-item'>
                <a href="/" className='nav-list-item-link'>About Us</a>
              </li>
              <li className='nav-list-item'>
                <a href="/" className='nav-list-item-link'>Capital One</a>
              </li>
              <li className='nav-list-item'>
                <a href="/" className='nav-list-item-link'>Contact Us</a>
              </li>
            </ul>
          </div>
          { !userLoggedIn ?
            <div className='nav-buttons-container'>
              <div className='nav-button-log-in'>
                <button className='secondary-button' onClick={() => navigate("/login")}>Log In</button>
              </div>

              <div className='nav-button-log-up'>
                <button className="primary-button sign-up-button" onClick={() => navigate("/sign-up")}>Sign Up</button>
              </div>
            </div> : 
            <div className='nav-buttons-container'>
              <div className='nav-button-log-up'>
                <button className="secondary-button" onClick={() => {
                  setUserLoggedIn(false)
                  navigate("/login")
                }}>Log Out</button>
              </div>
            </div>
          }

        </div>
      </>
  )
}

export default Nav