import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import axios from 'axios'
=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { OrdersProvider } from './components/OrdersContext'

<<<<<<< HEAD
axios.defaults.baseURL = 'https://etqanproject.runasp.net'

=======
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrdersProvider>
      <App />
    </OrdersProvider>
  </StrictMode>,
)
