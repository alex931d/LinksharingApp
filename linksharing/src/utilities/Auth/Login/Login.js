import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IsAuth from '../../IsAuth';
import LargeLogo from '../../../images/logo-devlinks-large.svg';
import LinkImg from '../../../images/link-solid(1).svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import { useIsAuthenticated } from 'react-auth-kit';

import { Link } from 'react-router-dom';

import '../../universel/formStyles.css';
import Cookies from "universal-cookie";
import axios from 'axios';
import useAuth from '../../../compunets/lib/auth';
const cookies = new Cookies()

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  IsAuth();

  const handleSubmit = async (values, loginProvider) => {
    try {

      await login(values, loginProvider);
    } catch (error) {
      toast.error('Login failed.');
    }
    finally {
      const promise = new Promise(async (resolve, reject) => {
        try {
          const token = cookies.get("jwt");
          if (token) {
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      })
      promise.then(() => {
        navigate('/editor/links');
      })
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-inner">
        <div className="logo-container">
          <img src={LargeLogo} alt="Logo"></img>
        </div>
        <div className="form-container">
          <div className="form-container-header">
            <span>Login</span>
            <p>Add your details below to get back into the app</p>
          </div>
          <div className="form-container-body">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(data) => { handleSubmit(data, null) }}
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
                      className="input"
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
                <button type="submit" className="btn" disabled={false}>
                  Log in
                </button>

                <GoogleLogin
                  onSuccess={credentialResponse => {
                    handleSubmit(credentialResponse, "google");
                  }}
                  onError={(err) => {
                    toast.error(err);
                  }}
                />
                <Link to="/signup">
                  don't have an account already? sign up here
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;