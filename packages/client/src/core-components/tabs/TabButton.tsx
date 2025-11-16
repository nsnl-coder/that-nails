import type { PropsWithChildren } from 'react';
import { useContext, useEffect, useRef } from 'react';
import cn from '../../utils/cn.util';
import { TabContext } from './TabContainer';

interface Props extends PropsWithChildren {
  tabName: string | number;
  className?: string;
  toggleMode?: boolean;
}

export default function TabButton(props: Props): React.JSX.Element {
  const { className, tabName, toggleMode } = props;
  const {
    currentTab,
    setCurrentTab,
    tabButtonClassName,
    activeTabButtonClassName = 'bg-red-400',
  } = useContext(TabContext);

  const tabRef = useRef<HTMLDivElement>(null);

  const isActiveTab = tabName === currentTab;

  useEffect(() => {
    if (!tabRef.current) {
      return;
    }

    if (isActiveTab) {
      tabRef.current.focus();
    }
  }, [isActiveTab]);

  const selectTab = () => {
    if (isActiveTab && toggleMode) {
      setCurrentTab(-1);
    } else {
      setCurrentTab(tabName);
    }
  };

  return (
    <div
      onClick={selectTab}
      ref={tabRef}
      className={cn(
        className,
        tabButtonClassName,
        isActiveTab && activeTabButtonClassName,
      )}
    >
      {props.children}
    </div>
  );
}
