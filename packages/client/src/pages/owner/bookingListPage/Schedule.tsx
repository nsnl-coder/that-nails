import cn from '../../../utils/cn.util';
import AppoinmentList from './AppoinmentList';

interface Props {}

export default function Schedule(): React.JSX.Element {
  const numberOfTechnicians = 10;
  const startHour = 9;
  const endHour = 20;

  return (
    <div className="w-[880px] grid grid-cols-11 grow border-y border-red-500 border-r relative">
      <div
        className={cn(
          'col-span-1 row-span-1',
          'border-l border-solid border-l-black',
        )}
      ></div>
      {Array.from({ length: numberOfTechnicians }).map((_, index) => (
        <div
          className={cn(
            'col-span-1 row-span-1 h-12',
            'border-l border-solid border-l-black',
          )}
          key={index}
        >
          <h1>Technician {index + 1}</h1>
        </div>
      ))}
      {Array.from({ length: (numberOfTechnicians + 1) * 12 * 4 }).map(
        (_, index) => {
          const startHour = 9;
          const rowNumber = Math.floor(index / (numberOfTechnicians + 1));
          const cellTime = 15; // minutes

          const passedMinutes = rowNumber * cellTime;
          const currentMinute = passedMinutes % 60;
          const currentHour = startHour + (passedMinutes - currentMinute) / 60;
          const isFirstColumn = index % (numberOfTechnicians + 1) === 0;
          const shouldShowTime =
            (currentMinute === 0 || currentMinute === 30) && isFirstColumn;

          const isSolidBorder = currentMinute === 0 || currentMinute === 30;

          return (
            <div
              key={index}
              className={cn(
                'col-span-1 row-span-1 bg-x-500 h-12',
                'border-l border-l-black',
                isSolidBorder
                  ? 'border-t border-t-black'
                  : 'border-t border-blue-400 [border-top-style:dashed]',
              )}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {shouldShowTime
                  ? `${currentHour}:${currentMinute
                      .toString()
                      .padStart(2, '0')}`
                  : ''}
              </div>
            </div>
          );
        },
      )}
      <AppoinmentList />
    </div>
  );
}
