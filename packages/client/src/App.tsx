import { Route, Routes } from 'react-router';
import CheckinPage from './pages/checkinPage/CheckinPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<CheckinPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;
