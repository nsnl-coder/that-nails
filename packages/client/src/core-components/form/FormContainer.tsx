import type { HTMLAttributes } from 'react';
import cn from '../../utils/cn.util';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function FormContainer(props: Props): React.JSX.Element {
  const { className, ...rest } = props;

  return (
    <div className={cn(className, 'flex flex-col gap-4')} {...rest}>
      {props.children}
    </div>
  );
}
