import Schedule from './Schedule';

export default function BookingListPage(): React.JSX.Element {
  return (
    <div className='grow flex p-4 h-screen overflow-auto'>
      <Schedule />
    </div>
  );
}
