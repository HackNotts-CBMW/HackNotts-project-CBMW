import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import homePagePic from "../img/login-pic.png"

const Login = () => {
  const [navStatus, setNavStatus] = useState(false)

  const handleFormSubmission = () => {

  }

  useEffect(() => {
    console.log(navStatus)
  }, [navStatus])

  return (
    <>
      <div onClick={() => setNavStatus(!navStatus)} className='nav-mobile'>
        <span className='nav-mobile-item'></span>
        <span className='nav-mobile-item'></span>
        <span className='nav-mobile-item'></span>
      </div>
      
      <div className={navStatus ? `nav open` : `nav`}>
        <div className='nav-logo'>
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

        <div className='nav-buttons-container'>
        <div className='nav-button-log-in'>
          <button className='secondary-button'>Log In</button>
        </div>

        <div className='nav-button-log-up'>
          <button className="primary-button sign-up-button">Sign Up</button>
        </div>
      </div>
      </div>

      <div className='home-page'>
        <div className='home-page-img-container'>
          <img className="home-page-img" src={homePagePic} alt="A cartoon of a person using their card to buy online products"/>
        </div>

        <div className="log-in">
          <Formik
            onSubmit={handleFormSubmission}
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={ Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Please Enter Email'),
              password: Yup.string()
                .required('Please enter your pasword')
            })}
          >
            {props => (
              <Form className='log-in-form'>
                <h1 className='log-in-form-heading'>Welcome back...</h1>
                <p className='log-in-form-subheading'>Please enter your email and password</p>

                <div className='log-in-field-conatiner'>
                  {/* <label htmlFor="email" className='log-in-field-label'>Email</label> */}
                  <Field placeholder="Email" className="log-in-field" type="text" name="email"/>
                  {props.errors.email &&  props.touched.email && <p className="login-input-error" name="email">{props.errors.email}</p>}
                </div>

                <div className='log-in-field-conatiner'>
                  {/* <label htmlFor="password" className='log-in-field-label'>Password</label> */}
                  <Field placeholder="Password" className="log-in-field log-in-field-password" type="text" name="password"/>
                  {props.errors.password &&  props.touched.password && <p className="login-input-error" name="password">{props.errors.password}</p>}
                </div>

                <p className='log-in-form-subheading log-in-form-desc'>By logging in, you agree to our <a href="/">Terms & Conditions</a></p>

                <button
                  className="primary-button log-in-button" 
                  type="submit" 
                  disabled={props.isValid === false}>Login...
                </button>
              </Form>
            )}
            
          </Formik>
      </div>
      </div>

    </>
  )
}

export default Login