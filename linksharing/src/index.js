import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from "react-auth-kit";
import App from './App';
import { APIContextProvider } from '../src/compunets/lib/context';
import { Router, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DarkModeProvider } from './compunets/lib/themeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId='395271532290-tg98mth9eft33btlenfdvb03da0lm38m.apps.googleusercontent.com'>
          <AuthProvider
            authType={'cookie'}
            authName={'jwt'}
            cookieDomain={window.location.hostname}
            cookieSecure={false}>
            <APIContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </APIContextProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
