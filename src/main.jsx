import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import App from './App.jsx';
import 'antd/dist/reset.css';
import ShippingCartProvider from './context/ShoppingCartContext.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShippingCartProvider>
      <App />
    </ShippingCartProvider>
  </StrictMode>
);
