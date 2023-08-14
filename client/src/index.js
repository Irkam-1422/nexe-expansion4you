import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLosF_YL9iFRnTNGgAbtBNz5M9Avow-wM",
  authDomain: "expansion4you-b4046.firebaseapp.com",
  projectId: "expansion4you-b4046",
  storageBucket: "expansion4you-b4046.appspot.com",
  messagingSenderId: "648825997527",
  appId: "1:648825997527:web:1bf1b5be92b0c230d58892",
  measurementId: "G-2XGJ3HJPP6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <App />
    </Router>
);


reportWebVitals();
