import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

import homePagePic from "../img/login-pic-2.png"

const Login = ({ setUserLoggedIn }) => {
    const navigate = useNavigate()

  const handleFormSubmission = (event) => {
    fetch('/api/login', {
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
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data.Accounts[0]))

        setUserLoggedIn(true)
        navigate("/dashboard")
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
                  <Field placeholder="Password" className="log-in-field log-in-field-password" type="password" name="password"/>
                  {props.errors.password &&  props.touched.password && <p className="login-input-error" name="password">{props.errors.password}</p>}
                </div>

                <p className='log-in-form-subheading log-in-form-desc'>By logging in, you agree to our <a href="/">Terms & Conditions</a></p>

                <button
                  className="primary-button log-in-button" 
                  type="submit" 
                  disabled={props.isValid === false}>Login
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