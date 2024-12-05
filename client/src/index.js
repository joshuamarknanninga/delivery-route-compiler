import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Cannot find element with id 'root' in the DOM.");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA
serviceWorker.register();
