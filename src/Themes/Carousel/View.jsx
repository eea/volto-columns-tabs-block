import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useSpringCarousel } from 'react-spring-carousel-js';
import { Icon } from '@plone/volto/components';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import scrollSVG from '@eeacms/volto-columns-tabs-block/icons/scroll.svg';
import rightKeySVG from '@plone/volto/icons/circle-right.svg';
import leftKeySVG from '@plone/volto/icons/circle-left.svg';

const DefaultTabView = (props) => {
  const { data = {}, activeTab = null, setActiveTab } = props;
  const initialActiveTab = data.initial_active_tab;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];
  const hasScrollIcon = data.scrollIcon;
  const color = data.color || 'light';

  const panes = tabs?.map((tab, index) => ({
    id: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    renderItem: <TabPaneView {...props} tabId={tab} />,
  }));

  const activeTabIndex = tabs.indexOf(activeTab);

  React.useEffect(() => {
    if (
      initialActiveTab &&
      initialActiveTab < tabs.length &&
      tabs[initialActiveTab] &&
      initialActiveTab !== activeTabIndex
    ) {
      setActiveTab(tabs[initialActiveTab]);
    }
    // eslint-disable-next-line
  }, []);

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    slideToItem,
    useListenToCustomEvent,
    getCurrentActiveItem,
  } = useSpringCarousel({
    initialActiveItem: initialActiveTab,
    items: [...panes],
  });

  useListenToCustomEvent('onSlideChange', (data) => {
    const currentActiveItem = getCurrentActiveItem();
    if (activeTab !== currentActiveItem.id) {
      setActiveTab(currentActiveItem.id);
    }
  });

  return (
    <div style={{ position: 'relative' }} className="full-width">
      {carouselFragment}
      <div className={cx('carousel-slider', color)}>
        {activeTabIndex > 0 ? (
          <Icon
            className="left-arrow"
            onClick={() => {
              slideToPrevItem();
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
              slideToNextItem();
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
              active={activeTabIndex === index}
              onClick={() => {
                if (activeTabIndex !== index) {
                  slideToItem(index);
                  setActiveTab(tabs[index]);
                }
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
