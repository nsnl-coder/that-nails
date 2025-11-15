import type { PropsWithChildren } from 'react';

export default function H2(props: PropsWithChildren): React.JSX.Element {
  return <h2>{props.children}</h2>;
}
