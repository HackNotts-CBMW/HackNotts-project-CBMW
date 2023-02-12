import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import homePagePic from "../img/login-pic-2.png"

const SignUp = ({ setUserLoggedIn }) => {
  // const handleFormSubmission = () => {
  //   setUserLoggedIn(true)
  // }

  const navigate = useNavigate()

  const handleFormSubmission = (event) => {
    fetch('/api/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": event.email,
        "password": event.password
      })
    })
      .then(async (response) => await response.json())
      .then((data) => {
        navigate("/login")
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <>
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
              fname: Yup.string()
                .required('Please Enter Your First Name'),
              sname: Yup.string()
                .required('Please Enter Your First Name'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Please Enter Email'),
              password: Yup.string()
                .required('Please enter your pasword')
            })}
          >
            {props => (
              <Form className='log-in-form'>
                <h1 className='log-in-form-heading'>Welcome!</h1>
                <p className='log-in-form-subheading'>Please enter your details to sign up</p>

                <div className='log-in-field-conatiner'>
                  <Field placeholder="First Name" className="log-in-field" type="text" name="fname"/>
                  {props.errors.fname &&  props.touched.fname && <p className="login-input-error" name="fname">{props.errors.fname}</p>}
                </div>

                <div className='log-in-field-conatiner'>
                  <Field placeholder="Second Name" className="log-in-field sign-up-field" type="text" name="sname"/>
                  {props.errors.sname &&  props.touched.sname && <p className="login-input-error" name="sname">{props.errors.sname}</p>}
                </div>

                <div className='log-in-field-conatiner'>
                  <Field placeholder="Email" className="log-in-field sign-up-field" type="text" name="email"/>
                  {props.errors.email &&  props.touched.email && <p className="login-input-error" name="email">{props.errors.email}</p>}
                </div>

                <div className='log-in-field-conatiner'>
                  {/* <label htmlFor="password" className='log-in-field-label'>Password</label> */}
                  <Field placeholder="Password" className="log-in-field log-in-field-password" type="password" name="password"/>
                  {props.errors.password &&  props.touched.password && <p className="login-input-error" name="password">{props.errors.password}</p>}
                </div>

                <p className='log-in-form-subheading log-in-form-desc'>By signing up, you agree to our <a href="/">Terms & Conditions</a></p>

                <button
                  className="primary-button log-in-button" 
                  type="submit" 
                  disabled={props.isValid === false}>Sign Up...
                </button>
              </Form>
            )}
            
          </Formik>
      </div>
      </div>

    </>
  )
}

export default SignUp