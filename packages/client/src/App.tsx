import { Routes, Route } from 'react-router';
import CheckinPage from './pages/CheckinPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<CheckinPage />} />
    </Routes>
  );
};

export default App;
