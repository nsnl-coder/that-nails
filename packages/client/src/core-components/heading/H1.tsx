import type { PropsWithChildren } from 'react';

export default function H1(props: PropsWithChildren): React.JSX.Element {
  return <h1 className="text-2xl font-bold">{props.children}</h1>;
}
