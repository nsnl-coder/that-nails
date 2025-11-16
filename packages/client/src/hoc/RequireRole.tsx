import { USER_ROLE } from '@thatnails/shared';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import type { RootState } from '../store/index.store';

interface Props {
  role: USER_ROLE;
}

export default function RequireRole(props: Props): React.JSX.Element | null {
  const user = useSelector((state: RootState) => state.currrentUser.user);
  const isRootUser = user && user.roleInfo.role === USER_ROLE.ROOT;
  const isAuthorizedRole = user && user.roleInfo.role === props.role;

  if (user === undefined) return <h1>Loading....</h1>;
  if (user === null) return <Navigate to="/auth/sign-in" />;
  if (isAuthorizedRole || isRootUser) return <Outlet />;

  return <Navigate to="/" />;
}
