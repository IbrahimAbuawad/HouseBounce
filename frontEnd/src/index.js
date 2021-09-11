import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContext from './context/AuthContext';
import PropContext from './context/PropContext';

import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContext>
        <PropContext>
          <App />
        </PropContext>

      </AuthContext>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
