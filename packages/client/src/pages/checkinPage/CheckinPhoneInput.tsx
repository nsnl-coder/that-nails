import { useFormContext, useWatch } from 'react-hook-form';
import Button from '../../core-components/button/Button';

export default function CheckinInput(): React.JSX.Element {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const { setValue, getValues } = useFormContext();

  const handleAddDigit = (digit: number) => {
    return () => {
      const currentValue = getValues('phone') || '';

      if (currentValue.length >= 10) return;
      setValue('phone', currentValue + digit.toString());
    };
  };

  const handleDeleteDigit = () => {
    const currentValue = getValues('phone') || '';
    const newValue = currentValue.slice(0, -1);
    setValue('phone', newValue);
  };

  const phone = useWatch({ name: 'phone' });

  return (
    <div className="">
      <div className="text-2xl font-bold">{phone}</div>
      <div className="flex flex-row gap-2">
        {digits.map((digit) => (
          <Button
            type="button"
            key={digit}
            className="w-10 h-10 bg-gray-200 rounded-md"
            onClick={handleAddDigit(digit)}
          >
            {digit}
          </Button>
        ))}
      </div>
      <Button onClick={handleDeleteDigit}>Delete</Button>
    </div>
  );
}
