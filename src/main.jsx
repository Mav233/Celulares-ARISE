import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import App from './App.jsx';
import 'antd/dist/reset.css';
import ShippingCartProvider from './context/ShoppingCartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShippingCartProvider>
      <App />
    </ShippingCartProvider>
  </StrictMode>
);
