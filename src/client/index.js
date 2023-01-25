import React from 'react';
import { render } from 'react-dom';
import App from './pages/App.jsx';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// webpack bundles styles
import styles from './public/stylesheets/styles.scss';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
