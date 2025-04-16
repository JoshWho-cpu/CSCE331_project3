import { Routes, Route } from 'react-router-dom';
import ManagerMain from './pages/ManagerMain';
import OrderHistory from './pages/OrderHistory';
import EmployeeManagement from './pages/EmployeeManagement';
import MenuManagement from './pages/MenuManagement';
import InventoryManagement from './pages/InventoryManagement';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route index element={<ManagerMain />} /> 
      <Route path="OrderHistory" element={<OrderHistory />} /> 
      <Route path="EmployeeManagement" element={<EmployeeManagement />} /> 
      <Route path="MenuManagement" element={<MenuManagement />} /> 
      <Route path="InventoryManagement" element={<InventoryManagement />} /> 
    </Routes>
  );
};

export default ManagerRoutes;
