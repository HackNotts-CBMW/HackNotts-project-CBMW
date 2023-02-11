import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const handleFormSubmission = () => {

  }

  return (
    <>
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
                <h1 className='log-in-heading'>Login Form</h1>

                <div className='log-in-field-conatiner'>
                  <label htmlFor="email" className='log-in-field-label'>Email</label>
                  <Field className="log-in-field" type="text" name="email"/>
                  {props.errors.email &&  props.touched.email && <p className="input-error" name="email">{props.errors.email}</p>}
                </div>

                <div className='log-in-field-conatiner'>
                  <label htmlFor="password" className='log-in-field-label'>Password</label>
                  <Field className="log-in-field" type="text" name="password"/>
                  {props.errors.password &&  props.touched.password && <p className="input-error" name="password">{props.errors.password}</p>}
                </div>

                <button
                  className="primary-button log-in-button" 
                  type="submit" 
                  disabled={props.isValid === false}>Log In
                </button>
              </Form>
            )}
            
          </Formik>
      </div>
    </>
  )
}

export default Login