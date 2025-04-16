import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import KioskMain from './customer-kiosk/pages/KioskMain'
// import CashierMain from './cashier-view/pages/CashierMain'
import ManagerRoutes from './manager/routes'
import LoginPage from './LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/customer" element={<KioskMain/>} />
        <Route path="/cashier" element={<KioskMain/>} />
        <Route path="/manager/*" element={<ManagerRoutes/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App