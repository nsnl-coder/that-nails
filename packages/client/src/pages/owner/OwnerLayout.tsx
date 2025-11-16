import { Outlet } from 'react-router';
import OwnerSideBar from './OwnerSideBar';

export default function OwnerLayout(): React.JSX.Element {
  return (
    <div className='flex gap-x-4'>
      <OwnerSideBar />
      <Outlet />
    </div>
  );
}
