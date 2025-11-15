import type { PropsWithChildren } from 'react';

export default function H3(props: PropsWithChildren): React.JSX.Element {
  return <h3>{props.children}</h3>;
}
