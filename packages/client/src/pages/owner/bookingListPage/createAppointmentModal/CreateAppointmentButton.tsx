import { useParams } from 'react-router';
import Button from '../../../../core-components/button/Button';
import modalService from '../../../../core-components/modal/modalService';
import CreateAppointmenModal from './CreateAppointmentModal';

export default function CreateAppointmentButton(): React.JSX.Element {
  const salonId = useParams().salonId;

  const openCreateAppointmentModal = () => {
    modalService.openAsyncModal(CreateAppointmenModal, {
      salonId: Number(salonId),
    });
  };

  return (
    <Button onClick={openCreateAppointmentModal}>Create Appointment</Button>
  );
}
