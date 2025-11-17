import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import type { RootState } from '../store/index.store';
import { USER_ROLE } from '@thatnails/shared';

const RequireNotLogin = () => {
  const user = useSelector((state: RootState) => state.currrentUser.user);

  if (user === undefined) return <h1>Loading....</h1>;
  if (user && user.roleInfo.role === USER_ROLE.ROOT) {
    return <Navigate to='/root' />;
  }

  if (user) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default RequireNotLogin;
