import { Route, Routes } from 'react-router';
import CheckinPage from './pages/checkinPage/CheckinPage';
import CheckinSuccessPage from './pages/checkinSuccessPage/CheckinSuccessPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckinPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkin-success" element={<CheckinSuccessPage />} />
    </Routes>
  );
};

export default App;
