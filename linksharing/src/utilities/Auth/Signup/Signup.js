import React,{useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useIsAuthenticated} from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link  } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import IsAuth from '../../IsAuth';
import LargeLogo from '../../../images/logo-devlinks-large.svg';
import LinkImg from '../../../images/link-solid(1).svg';
import '../../universel/formStyles.css';
import './Signup.css';
import useAuth from '../../../compunets/lib/auth';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  IsAuth();
  const handleSubmit = async (values, loginProvider) => {
    try {
      await signup(values, loginProvider);
    } catch (error) {
      toast.error('signup failed.');
      navigate('/editor/links');
    }
    finally {
        navigate('/editor/links');
    }

  };

  return (
    <div className="signup-container">
      <div className="signup-container-inner">
        <div className="logo-container">
          <img src={LargeLogo} alt="Logo"></img>
        </div>
        <div className="form-container">
          <div className="form-container-header">
            <span>Signup</span>
            <p>Signup here</p>
          </div>
          <div className="form-container-body">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignupSchema}
              onSubmit={(data)=>{handleSubmit(data,null)}}
            >
              <Form>
                <div className="form-field">
                  <label>Email address</label>
                  <div className="input-field">
                    <div className="input-icon">
                      <img
                        width="25px"
                        height="25px"
                        className="input-icon"
                        alt="link icon"
                        src={LinkImg}
                      ></img>
                    </div>
                    <Field
                      type="text"
                      name="email"
                      placeholder="e.g alexander@hotmail.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="error" />

                </div>
                <div className="form-field">
                  <label>Password</label>
                  <div className="input-field">
                    <div className="input-icon">
                      <img
                        width="25px"
                        height="25px"
                        className="input-icon"
                        alt="link icon"
                        src={LinkImg}
                      ></img>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="error" />

                </div>
                <button type="submit" className="btn">
                  Sign up
                </button>
                <GoogleLogin
                onSuccess={credentialResponse => {
                  handleSubmit(credentialResponse,"google");
                }}
              onError={(err) => {
                toast.error(err);
              }}
              />
                <Link to="/login">
                  already have an account?
              </Link>
              </Form>
           
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;