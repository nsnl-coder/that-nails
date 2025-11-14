import type { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
}

export default function TextInput(props: Props): React.JSX.Element {
  const { register } = useFormContext();
  const { className, fieldName, ...rest } = props;

  return (
    <input
      type="text"
      className={`border border-gray-300 rounded-md p-2 ${className}`}
      {...register(fieldName)}
      {...rest}
    />
  );
}
