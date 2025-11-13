import type { PropsWithChildren } from 'react';

export default function Button({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <button className='bg-blue-500 text-white p-2 rounded-md'>
      {children}
    </button>
  );
}
