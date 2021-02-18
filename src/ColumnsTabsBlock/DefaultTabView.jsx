import React, { useEffect, useState, useRef } from 'react';
import { Menu, Transition } from 'semantic-ui-react';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const DefaultTabView = (props) => {
  const [state, setState] = useState({
    placeholderHeight: 0,
    exitingTab: null,
  });
  const [prevActiveTabState, setPrevActiveTabState] = useState(null);
  const { data = {}, activeTab = null, setActiveTab } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];

  const prevActiveTab = usePrevious(activeTab);
  const activeTabIndex = tabs.indexOf(activeTab);
  const prevActiveTabIndex = tabs.indexOf(prevActiveTabState);

  useEffect(() => {
    setPrevActiveTabState(prevActiveTab);
    /* eslint-disable-next-line */
  }, [activeTab]);

  const getDirection = (index) => {
    if (prevActiveTabIndex < activeTabIndex) {
      if (index === activeTabIndex) return 'left';
      return 'right';
    }
    if (index === activeTabIndex) return 'right';
    return 'left';
  };

  const panes = tabs?.map((tab, index) => ({
    tabId: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
  }));

  return (
    <>
      {!data.menu_hidden ? (
        <Menu attached>
          {panes.map((pane) => (
            <Menu.Item
              name={pane.tabName}
              active={pane.tabId === activeTab}
              onClick={() => {
                setActiveTab(pane.tabId);
              }}
            >
              {pane.tabName}
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        ''
      )}
      {tabs.length
        ? tabs?.map((tab, index) => (
            <Transition
              key={tab}
              animation={`slide ${getDirection(index)}`}
              duration={{ hide: 500, show: 500 }}
              visible={tab === activeTab}
              onHide={(event, data) => {
                if (data.status === 'EXITED') {
                  setTimeout(() => {
                    setState({
                      placeholderHeight: 0,
                      exitingTab: null,
                    });
                  }, 1);
                }
              }}
              onStart={(event, data) => {
                if (data.status === 'EXITING') {
                  const exitingTab = document.querySelector(
                    `.tab-container.tab-${index}`,
                  );
                  setState({
                    placeholderHeight: exitingTab.clientHeight,
                    exitingTab: tab,
                  });
                }
              }}
            >
              <div
                className={cx(
                  'tab-container',
                  `tab-${index}`,
                  state.placeholderHeight > 0 && state.exitingTab === tab
                    ? 'exiting'
                    : '',
                )}
              >
                <TabPaneView {...props} tabId={tab} />
              </div>
            </Transition>
          ))
        : ''}
      <div
        id="transition-placeholder"
        style={{ height: state.placeholderHeight }}
      />
    </>
  );
};

export default DefaultTabView;
