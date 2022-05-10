import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Social from './components/Social'
import Fitness from './components/Fitness'
import SignUp from './components/SignUp'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// hello

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='social' element={<Social />} />
      <Route path='fitness' element={<Fitness />} />
      <Route path='sign-up' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
