interface Props {}

export default function Schedule(): React.JSX.Element {
  const numberOfTechnicians = 10;
  const startHour = 9;
  const endHour = 20;

  return (
    <div className='grid grid-cols-10 grow bg-red-300'>
      {Array.from({ length: numberOfTechnicians }).map((_, index) => (
        <div className='col-span-1 row-span-1 border border-black' key={index}>
          <h1>Technician {index + 1}</h1>
        </div>
      ))}
      {Array.from({ length: numberOfTechnicians * 12 * 4 }).map((_, index) => (
        <div
          key={index}
          className='col-span-1 row-span-1 bg-x-500 border border-black'
        ></div>
      ))}
    </div>
  );
}
