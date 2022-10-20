import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserDataProvider } from './context/userDataContext';
// Import React Query 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '934971953145-3cam4qdff5st75e60mi6nrpeoucsqse3.apps.googleusercontent.com'

const queryClient = new QueryClient()


ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <UserDataProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserDataProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
