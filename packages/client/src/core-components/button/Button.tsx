import type { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps): React.JSX.Element {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="bg-blue-400 text-white p-2 rounded-md">
      {children}
    </button>
  );
}
