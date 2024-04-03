import React from 'react';
import ReactDOM from 'react-dom/client';
import Category from './Category';
import './scss/main.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Category />
  </React.StrictMode>
);
