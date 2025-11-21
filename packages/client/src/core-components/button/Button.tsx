import type { ButtonHTMLAttributes } from 'react';
import cn from '../../utils/cn.util';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps): React.JSX.Element {
  const { children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={cn('bg-blue-400 text-white p-2 rounded-md block', className)}
    >
      {children}
    </button>
  );
}
