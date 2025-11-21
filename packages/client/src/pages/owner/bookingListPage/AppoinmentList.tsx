import {
  APPOINTMENT_STATUS,
  type AppointmentTable,
  type JsonSelectable,
} from '@thatnails/shared';

interface Props {
  appoinments: AppointmentTable[];
}

const mockAppoinments: JsonSelectable<AppointmentTable>[] = [
  {
    id: 1,
    appointment_date: new Date().toString(),
    status: APPOINTMENT_STATUS.COMPLETED,
    duration: 60,
    user_id: 1,
    service_id: 1,
    created_at: new Date().toString(),
  },
];

export default function AppoinmentList(): React.JSX.Element {
  const scheduleStartHour = 9;
  const appointStartHour = 9;
  const duration = 15;

  const row = 10;
  const column = 3;

  const x = 80 * column;
  const y = 48 * row;

  return (
    <div
      style={{ left: x, top: y, width: 80, height: 48 * 5 }}
      className="absolute bg-red-500"
    >
      <p>Fullser acrylic</p>
    </div>
  );
}
