import type { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from '../../utils/cn.util';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
}

export default function DateInput(props: Props): React.JSX.Element {
  const { fieldName, className, ...rest } = props;
  const { register } = useFormContext();

  return (
    <input
      type="date"
      className={cn('border border-gray-300 rounded-md p-2 w-full', className)}
      {...register(fieldName)}
      {...rest}
    />
  );
}
