import { useFormContext } from 'react-hook-form';

interface Props {
  fieldName: string;
}

export default function InputError(props: Props): React.JSX.Element | null {
  const {
    formState: { errors },
  } = useFormContext();
  const { fieldName } = props;
  const errorMessage = errors[fieldName]?.message as string;

  if (!errorMessage) return null;

  return <p className="text-red-500 text-sm">{errorMessage}</p>;
}
