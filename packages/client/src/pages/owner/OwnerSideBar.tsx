import { Link, useParams } from 'react-router';

export default function OwnerSideBar(): React.JSX.Element {
  const salonId = useParams().salonId;

  return (
    <div className="w-60 h-screen bg-gray-100 flex flex-col gap-y-4 p-4">
      Owner Side Bar
      <Link to={`/owner/salons/${salonId}`}>Salon</Link>
      <Link to={`/owner/salons/${salonId}/users`}>Users</Link>
      <Link to={`/owner/salons/${salonId}/services`}>Users</Link>
    </div>
  );
}
