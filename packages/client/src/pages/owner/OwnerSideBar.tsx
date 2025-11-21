import { Link, useParams } from 'react-router';
import Heading from '../../core-components/heading/Heading';

export default function OwnerSideBar(): React.JSX.Element {
  const salonId = useParams().salonId;

  return (
    <div className="w-60 h-screen bg-gray-100 flex flex-col gap-y-4 p-4">
      <Heading.H1>Owner Side Bar</Heading.H1>
      <Link to={`/owner/salons/${salonId}`}>Salon</Link>
      <Link to={`/owner/salons/${salonId}/users`}>Users</Link>
      <Link to={`/owner/salons/${salonId}/categories`}>Services</Link>
      <Link to={`/owner/salons/${salonId}/bookings`}>Bookings</Link>
    </div>
  );
}
