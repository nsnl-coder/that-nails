import { Route, Routes } from 'react-router';
import CheckinPage from './pages/checkinPage/CheckinPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import CategoryListPage from './pages/categoryListPage/CategoryListPage';
import EmployeeListPage from './pages/employeeListPage/EmployeeListPage';

const App = () => {
  return (
    <Routes>
      <Route path='/checkin' element={<CheckinPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/categories' element={<CategoryListPage />} />
      <Route path='/categories/:id' element={<CategoryListPage />} />
      <Route path='/employees' element={<EmployeeListPage />} />
    </Routes>
  );
};

export default App;
