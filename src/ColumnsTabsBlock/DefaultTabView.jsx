import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useTransitionCarousel } from 'react-spring-carousel-js';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';

const DefaultTabView = (props) => {
  const { data = {}, activeTab = null, setActiveTab } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];

  const panes = tabs?.map((tab, index) => ({
    id: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    renderItem: <TabPaneView {...props} tabId={tab} />,
  }));

  const {
    carouselFragment,
    slideToItem,
    useListenToCustomEvent,
  } = useTransitionCarousel({
    items: [...panes],
  });

  const activeTabIndex = tabs.indexOf(activeTab);

  useListenToCustomEvent('onLeftSwipe', (data) => {
    setActiveTab(tabs[activeTabIndex + 1]);
  });

  useListenToCustomEvent('onRightSwipe', (data) => {
    setActiveTab(tabs[activeTabIndex - 1]);
  });

  return (
    <>
      {!data.menu_hidden ? (
        <Menu
          pointing
          secondary
          style={{ justifyContent: data.menu_alignment || 'left' }}
        >
          {data.menu_title ? (
            <Menu.Header>
              <Menu.Item>{data.menu_title}</Menu.Item>
            </Menu.Header>
          ) : (
            ''
          )}
          <div style={{ display: 'flex', flexFlow: 'row' }}>
            {panes.map((pane, index) => (
              <Menu.Item
                name={pane.tabName}
                active={pane.id === activeTab}
                onClick={() => {
                  setActiveTab(pane.id);
                  slideToItem(index);
                }}
              >
                {pane.tabName}
              </Menu.Item>
            ))}
          </div>
        </Menu>
      ) : (
        ''
      )}
      {carouselFragment}
    </>
  );
};

export default DefaultTabView;
