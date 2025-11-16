import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export enum CURRENT_TAB {
  INITIAL = -2,
  CLOSED = -1,
}

interface Props extends PropsWithChildren {
  tabButtonClassName?: string;
  tabPannelClassName?: string;
  activeTabButtonClassName?: string;
  initialTab?: string | number;
  currentTab?: string | number;
  setCurrentTab?: (tab: string | number) => void;
}

interface TabContextState extends Props {
  currentTab: string | number;
  tabButtonClassName?: string;
  tabPannelClassName?: string;
  activeTabButtonClassName?: string;
  initialTab?: string | number;
  setCurrentTab: (tab: string | number) => void;
}

export const TabContext = createContext({} as TabContextState);

export default function TabContainer(props: Props): React.JSX.Element {
  const {
    tabButtonClassName,
    tabPannelClassName,
    activeTabButtonClassName,
    initialTab = '',
  } = props;
  const [currentTab, setCurrentTab] = useState<string | number>(initialTab);

  return (
    <TabContext.Provider
      value={{
        currentTab: props.currentTab || currentTab,
        setCurrentTab: props.setCurrentTab || setCurrentTab,
        tabButtonClassName,
        tabPannelClassName,
        activeTabButtonClassName,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
}
