import React, { useEffect, useState, useRef } from 'react';
import { Menu, Transition } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import scrollSVG from '~/icons/scroll.svg';

import rightKeySVG from '@plone/volto/icons/circle-right.svg';
import leftKeySVG from '@plone/volto/icons/circle-left.svg';

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
  const hasScrollIcon = data.scrollIcon;
  const color = data.color || 'light';

  const prevActiveTab = usePrevious(activeTab);
  const activeTabIndex = tabs.indexOf(activeTab);
  const prevActiveTabIndex = tabs.indexOf(prevActiveTabState);

  useEffect(() => {
    // const auto = setInterval(() => {
    //   if (activeTabIndex < tabs.length - 1) {
    //     setActiveTab(tabs[activeTabIndex + 1]);
    //   } else {
    //     setActiveTab(tabs[0]);
    //   }
    // }, 5000);
    // return () => {
    //   clearInterval(auto);
    // };
  }, []);

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
    <div style={{ position: 'relative' }} className="full-width">
      {tabs.length
        ? tabs?.map((tab, index) => (
            <Transition
              key={tab}
              animation={`slide ${getDirection(index)}`}
              duration={{ hide: 500, show: 500 }}
              visible={tab === activeTab}
              onHide={(event, data) => {
                if (data.status === 'EXITED') {
                  setState({
                    placeholderHeight: 0,
                    exitingTab: null,
                  });
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
                    : state.placeholderHeight > 0 && state.exitingTab !== tab
                    ? 'entering'
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
      <div className={cx('carousel-slider', color)}>
        {activeTabIndex > 0 ? (
          <Icon
            className="left-arrow"
            onClick={() => {
              setActiveTab(tabs[activeTabIndex - 1]);
            }}
            name={leftKeySVG}
            size="30px"
            color="white"
          />
        ) : (
          <span />
        )}
        {activeTabIndex < tabs.length - 1 ? (
          <Icon
            className="right-arrow"
            onClick={() => {
              setActiveTab(tabs[activeTabIndex + 1]);
            }}
            name={rightKeySVG}
            size="30px"
            color="white"
          />
        ) : (
          <span />
        )}
      </div>
      <div className={cx('carousel-menu', color)}>
        <Menu attached>
          {panes.map((pane, index) => (
            <Menu.Item
              active={pane.tabId === activeTab}
              onClick={() => {
                setActiveTab(pane.tabId);
              }}
            >
              {hasScrollIcon &&
              panes.length % 2 > 0 &&
              index + 1 === Math.round(panes.length / 2) ? (
                <Icon
                  className="scroll"
                  name={scrollSVG}
                  size="30px"
                  color="white"
                />
              ) : (
                ''
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default DefaultTabView;
