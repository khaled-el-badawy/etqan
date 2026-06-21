import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { OrdersProvider } from './components/OrdersContext'

axios.defaults.baseURL = 'https://etqanproject.runasp.net'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrdersProvider>
      <App />
    </OrdersProvider>
  </StrictMode>,
)
