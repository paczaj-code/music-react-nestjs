import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContextProvider from './context/AppContext.js';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App.tsx';
import './assets/scss/global.scss';

const queryClient = new QueryClient();

axios.defaults.baseURL =
  import.meta.env.VITE_FRONTEND_MODE === 'development'
    ? 'http://localhost:3000/'
    : '/';
axios.defaults.headers.get['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
