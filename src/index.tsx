// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/index.scss';
// import App from './App';
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);
import Web3 from 'web3'
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import App from './App';
import { RootStoreProvider } from './hooks/useRootStore';
import { Web3ReactProvider } from '@web3-react/core'



ReactDOM.render(
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
,
  document.getElementById('root')
);
