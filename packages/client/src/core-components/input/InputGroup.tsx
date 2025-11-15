import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function InputGroup(props: Props): React.JSX.Element {
  const { children } = props;
  return <div className="flex flex-col gap-2">{children}</div>;
}
