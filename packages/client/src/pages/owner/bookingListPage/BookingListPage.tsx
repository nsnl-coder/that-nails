import { useParams } from 'react-router';
import CreateAppointmentModal from './createAppointmentModal/CreateAppointmentModal';

export default function BookingListPage(): React.JSX.Element {
  const salonId = useParams().salonId;

  return (
    <div className="grow flex px-12 py-12 h-screen flex-col overflow-auto">
      {/* <Schedule /> */}
      {/* <CreateAppointmentButton /> */}
      <CreateAppointmentModal
        id="create-appointment-modal"
        resolve={() => {}}
        isOpen={true}
        salonId={Number(salonId)}
      />
    </div>
  );
}
