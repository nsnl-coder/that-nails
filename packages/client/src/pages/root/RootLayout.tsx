import { Outlet } from 'react-router';
import RootPageSideBar from './RootPageSideBar';

export default function RootLayout(): React.JSX.Element {
  return (
    <div className="flex h-screen">
      <RootPageSideBar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
