import { Routes, Route } from 'react-router-dom';
import ManagerMain from './pages/ManagerMain';
import OrderHistory from './pages/OrderHistory';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route index element={<ManagerMain />} /> 
      <Route path="OrderHistory" element={<OrderHistory />} /> 
    </Routes>
  );
};

export default ManagerRoutes;
