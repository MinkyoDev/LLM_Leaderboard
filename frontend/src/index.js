import React from 'react';
import ReactDOM from 'react-dom'; // ReactDOM을 react-dom에서 직접 임포트
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

// ReactDOM.render를 사용하여 App 컴포넌트를 루트에 렌더링합니다.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
