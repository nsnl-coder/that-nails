import type { PropsWithChildren } from 'react';
import cn from '../../utils/cn.util';
import Transition from '../transition/Transition';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  notCenter?: boolean;
  className?: string;
}

export default function ModalTransition(props: Props): React.JSX.Element {
  const { isOpen = true, notCenter = false, className } = props;

  return (
    <Transition
      enterFrom="opacity-0"
      enterTo="opacity-100 duration-150 transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 duration-150"
      isOpen={isOpen}
      extraClassName={cn(
        'w-screen h-screen',
        !notCenter && 'fixed inset-0 flex items-center justify-center',
        className,
      )}
    >
      {props.children}
    </Transition>
  );
}
