import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { USER_ROLE } from '../../shared/dist/esm/enum';
import { useAppDispatch } from './config/redux.config';
import RequireNotLogin from './hoc/RequireNotLogin';
import RequireRole from './hoc/RequireRole';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import RootPageSideBar from './pages/root/RootPageSideBar';
import { useGetCurrentUserQuery } from './store/auth.api';
import { userSliceActions } from './store/user.slice';

const App = () => {
  const {
    data: currentUser,
    isSuccess,
    isError,
  } = useGetCurrentUserQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && currentUser) {
      dispatch(userSliceActions.setUser(currentUser));
    }

    if (isError) {
      dispatch(userSliceActions.setUser(null));
    }
  }, [currentUser, isSuccess, isError]);

  return (
    <Routes>
      <Route path="/auth" element={<RequireNotLogin />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="/root" element={<RequireRole role={USER_ROLE.ROOT} />}>
        <Route index element={<RootPageSideBar />} />
      </Route>

      {/* <Route path="/" element={<RequireLogin />}>
        <Route element={<RequireRole role={USER_ROLE.CUSTOMER} />}>
          <Route index element={<div>this is customer page</div>} />
        </Route>
        <Route element={<RequireRole role={USER_ROLE.EMPLOYEE} />}></Route>
        <Route element={<RequireRole role={USER_ROLE.OWNER} />}></Route>
      </Route> */}

      {/* <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/employees" element={<EmployeeListPage />} />
      <Route path="/categories/:id" element={<CategoryListPage />} />
      <RequireRole role={USER_ROLE.OWNER}></RequireRole>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkin" element={<CheckinPage />} /> */}
    </Routes>
  );
};

export default App;
