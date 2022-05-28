import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Social from './components/Social'
import Fitness from './components/Fitness'
import UserAuth from './components/UserAuth'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Logger from './components/Logger';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserAuth />} />
        <Route path='social' element={<Social />} />
        <Route path='fitness' element={<Fitness />} />
        <Route path='main' element={<App />} />
        <Route path='workout' element={<Logger />} />
        {/* <Route path='community' element={<CreateCommunity />} /> */}
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
