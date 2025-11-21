import { validationSchema } from '@thatnails/shared';
import type z from 'zod';
import Form from '../../../../core-components/form/Form';
import Backdrop from '../../../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../../../core-components/modal/ModalContainer';
import ModalTransition from '../../../../core-components/modal/ModalTransition';
import { useCreateAppointmentMutation } from '../../../../store/appoinment.api';
import Step1 from './GuestInput';

interface Props extends IBaseModal {
  salonId: number;
}

export default function CreateAppointmentModal(
  props: Props,
): React.JSX.Element {
  const { salonId, isOpen } = props;

  const [createAppointment] = useCreateAppointmentMutation();

  const handleSubmit = (
    data: z.infer<typeof validationSchema.appointments.create>,
  ) => {
    createAppointment(data);
  };

  return (
    <ModalTransition isOpen={isOpen}>
      <Form
        validationSchema={validationSchema.appointments.create}
        onSubmit={handleSubmit}
        className="bg-white min-w-96 shrink-0 z-20 p-6 space-y-4"
        defaultValues={{
          appointment_date: new Date().toISOString().split('T')[0],
          guests: [{ name: 'Guest #1', technician_id: null, services: [] }],
          salon_id: salonId,
        }}
      >
        <Step1 salonId={salonId} />
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
