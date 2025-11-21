import { useWatch } from 'react-hook-form';

export default function AvailableDate(): React.JSX.Element {
  const appointmentDate = useWatch({ name: 'appointment_date' });
  const guests = useWatch({ name: 'guests' });

  return <div></div>;
}
