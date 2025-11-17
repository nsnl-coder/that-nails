import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from './config/redux.config';
import ModalContainer from './core-components/modal/ModalContainer';
import RequireNotLogin from './hoc/RequireNotLogin';
import RequireRole from './hoc/RequireRole';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import OwnerLayout from './pages/owner/OwnerLayout';
import SalonUserListPage from './pages/owner/salonUserListPage/SalonUserListPage';
import RootLayout from './pages/root/RootLayout';
import SalonListPage from './pages/root/salonListPage/SalonListPage';
import { useGetCurrentUserQuery } from './store/auth.api';
import { userSliceActions } from './store/user.slice';
import { USER_ROLE } from '@thatnails/shared';
import CategoryServicePageLayout from './pages/owner/salonServicePage/CategoryServicePageLayout';
import CategoryServicesPage from './pages/owner/salonServicePage/CategoryServicesPage';

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
    <div>
      <Routes>
        <Route path='/auth' element={<RequireNotLogin />}>
          <Route path='sign-in' element={<SignInPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
        </Route>
        <Route path='/root' element={<RequireRole role={USER_ROLE.ROOT} />}>
          <Route element={<RootLayout />}>
            <Route index element={<div>this is root page</div>} />
            <Route path='salons' element={<SalonListPage />} />
          </Route>
        </Route>
        <Route
          path='/owner/salons/:salonId'
          element={<RequireRole role={USER_ROLE.OWNER} />}
        >
          <Route element={<OwnerLayout />}>
            <Route index element={<div>this is owner salon page</div>} />
            <Route path='users' element={<SalonUserListPage />} />
            <Route path='categories' element={<CategoryServicePageLayout />}>
              <Route index element={<CategoryServicesPage />} />
              <Route path=':categoryId' element={<CategoryServicesPage />} />
            </Route>
          </Route>
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
      <ModalContainer />
    </div>
  );
};

export default App;
