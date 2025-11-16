import type { PropsWithChildren } from 'react';
import { useContext } from 'react';
import cn from '../../utils/cn.util';
import { TabContext } from './TabContainer';

interface Props extends PropsWithChildren {
  tabName: string | number;
  className?: string;
}

export default function TabPannel(props: Props): React.JSX.Element | null {
  const { tabName, className } = props;
  const { currentTab, tabPannelClassName } = useContext(TabContext);

  if (tabName !== currentTab) {
    return null;
  }

  return (
    <div className={cn(className, tabPannelClassName)}>{props.children}</div>
  );
}
