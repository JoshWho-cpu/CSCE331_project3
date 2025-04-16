import { Routes, Route } from 'react-router-dom';
import ManagerMain from './pages/ManagerMain';
import OrderHistory from './pages/OrderHistory';
import EmployeeManagement from './pages/EmployeeManagement';
import MenuManagement from './pages/MenuManagement';
import InventoryManagement from './pages/InventoryManagement';
import ReportGeneration from './pages/ReportGeneration';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route index element={<ManagerMain />} /> 
      <Route path="OrderHistory" element={<OrderHistory />} /> 
      <Route path="EmployeeManagement" element={<EmployeeManagement />} /> 
      <Route path="MenuManagement" element={<MenuManagement />} /> 
      <Route path="InventoryManagement" element={<InventoryManagement />} /> 
      {/* <Route path="ReportGeneration" element={<ReportGeneration />} />  */}
    </Routes>
  );
};

export default ManagerRoutes;
