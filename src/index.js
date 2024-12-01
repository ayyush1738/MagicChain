import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = "344566954706-snr12b4aof3ki0108t6pcfis27d4qjp6.apps.googleusercontent.com"

document.title = "MagicChain";
<link rel="icon" href="src\favicon.ico" type="image/x-icon" />

root.render(
<React.StrictMode>
  <GoogleOAuthProvider clientId = {GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
</React.StrictMode>
);