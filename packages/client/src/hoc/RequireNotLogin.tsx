import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { USER_ROLE } from '../../../shared/dist/esm/enum';
import type { RootState } from '../store/index.store';

const RequireNotLogin = () => {
  const user = useSelector((state: RootState) => state.currrentUser.user);

  if (user === undefined) return <h1>Loading....</h1>;
  if (user && user.role === USER_ROLE.ROOT) {
    return <Navigate to="/root" />;
  }

  return <Outlet />;
};

export default RequireNotLogin;
