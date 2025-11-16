import { Link } from 'react-router';
import Logo from '../../components/logo/Logo';

export default function RootPageSideBar(): React.JSX.Element {
  return (
    <div className="w-60 h-screen bg-gray-100 flex flex-col gap-y-4 p-4">
      <Logo />
      <Link to="/root">Home</Link>
      <Link to="/root/salons">Salons</Link>
    </div>
  );
}
