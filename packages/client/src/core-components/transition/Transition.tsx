import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import cn from '../../utils/cn.util';

type TransitionState = 'entering' | 'entered' | 'leaving' | 'left';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  enterFrom: string;
  enterTo: string;
  leaveFrom: string;
  leaveTo: string;
  extraClassName?: string;
}

export default function Transition(props: Props): React.JSX.Element {
  const { enterFrom, enterTo, leaveFrom, leaveTo, isOpen, extraClassName } =
    props;

  const [transitionState, setTransitionState] = useState<TransitionState>(
    isOpen ? 'entering' : 'left',
  );

  useEffect(() => {
    let timeoutId: number;
    if (
      isOpen &&
      transitionState !== 'entering' &&
      transitionState != 'entered'
    ) {
      setTransitionState('entering');
    }

    if (isOpen && transitionState === 'entering') {
      timeoutId = setTimeout(() => {
        setTransitionState('entered');
      }, 5);
    }

    if (!isOpen && transitionState !== 'leaving' && transitionState != 'left') {
      setTransitionState('leaving');
    }

    if (!isOpen && transitionState === 'leaving') {
      timeoutId = setTimeout(() => {
        setTransitionState('left');
      }, 5);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, transitionState]);

  let className = isOpen ? enterFrom : '';

  if (transitionState === 'entering') {
    className = enterFrom;
  }

  if (transitionState === 'entered') {
    className = enterTo;
  }

  if (transitionState === 'leaving') {
    className = leaveFrom;
  }

  if (transitionState === 'left') {
    className = leaveTo;
  }

  return <div className={cn(className, extraClassName)}>{props.children}</div>;
}
