import React from 'react';
import ReactDOM from 'react-dom/client';
// import { render } from 'react-dom';
import App from './pages/App.jsx';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// webpack bundles styles
import styles from './public/stylesheets/styles.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
