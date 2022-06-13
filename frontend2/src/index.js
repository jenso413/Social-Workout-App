import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Social from './components/Social'
import Fitness from './components/Fitness'
import UserAuth from './components/UserAuth'
import Friends from './components/Friends'
import Communities from './components/Communities'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Logger from './components/Logger';
import Graph from './components/Graph';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserAuth />} />
        <Route path='social' element={<Social />} />
        <Route path='fitness' element={<Fitness />} />
        <Route path='main' element={<App />} />
        <Route path='fitness/workout' element={<Logger />} />
        <Route path='social/communities' element={<Communities />} />
        <Route path='social/friends' element={<Friends />} />
        <Route path='fitness/graph' element={<Graph />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
