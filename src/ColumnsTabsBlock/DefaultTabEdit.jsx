import React from 'react';
import { Menu } from 'semantic-ui-react';
import { emptyTab } from '@eeacms/volto-columns-tabs-block/helpers';
import TabPaneEdit from './TabPaneEdit';
import { useTransitionCarousel } from 'react-spring-carousel-js';

const DefaultTabEdit = (props) => {
  const {
    data = {},
    activeTab = null,
    block,
    updateState,
    onChangeBlock,
  } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];

  const panes = tabs?.map((tab, index) => ({
    id: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    renderItem: <TabPaneEdit {...props} tabId={tab} />,
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
    updateState({ activeTab: tabs[activeTabIndex + 1] });
  });

  useListenToCustomEvent('onRightSwipe', (data) => {
    updateState({ activeTab: tabs[activeTabIndex - 1] });
  });

  const addNewTab = () => {
    const newData = {
      ...emptyTab(tabsData),
    };
    // const items = newData.blocks_layout.items;
    onChangeBlock(block, {
      ...data,
      data: {
        ...newData,
      },
    });
    // TODO: Fix this
    // updateState({
    //   activeTab: items[items.length - 1],
    // });
    // slideToItem(items[items.length - 1]);
  };

  const deleteTab = (id) => {
    const newData = {
      blocks: { ...tabsData.blocks },
      blocks_layout: { items: [...tabsData.blocks_layout.items] },
    };
    const items = newData.blocks_layout.items;
    if (!id) {
      const lastTabId = items.pop();
      delete newData.blocks[lastTabId];
    } else {
      const tabIndex = items.indexOf(id);
      items.splice(tabIndex, 1);
      delete newData.blocks[id];
    }
    onChangeBlock(block, {
      ...data,
      data: {
        ...newData,
      },
    });
    // TODO: Fix this
    // updateState({
    //   activeTab: items[items.length - 1],
    // });
    // slideToItem(items.length - 1);
  };

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
                  updateState({
                    activeTab: pane.id,
                    activeBlock: null,
                    activeColumn: null,
                    colSelections: {},
                  });
                  slideToItem(index);
                }}
              >
                {pane.tabName}
              </Menu.Item>
            ))}
            <Menu.Item name="addition" onClick={addNewTab}>
              +
            </Menu.Item>
            {tabs.length > 1 ? (
              <Menu.Item
                name="minus"
                onClick={() => {
                  deleteTab();
                }}
              >
                -
              </Menu.Item>
            ) : (
              ''
            )}
          </div>
        </Menu>
      ) : (
        ''
      )}
      {carouselFragment}
    </>
  );
};

export default DefaultTabEdit;
