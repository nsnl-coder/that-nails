import { useParams } from 'react-router';
import SalonUserList from '../../../components/salonUserList/SalonUserList';

export default function OwnerListPage(): React.JSX.Element {
  const salonId = useParams().salonId;

  return (
    <div className="p-8 space-y-8">
      <SalonUserList salonId={Number(salonId)} />
    </div>
  );
}
