import React from 'react';
import { Tab, Menu, Transition } from 'semantic-ui-react';
import { emptyTab } from '@eeacms/volto-columns-tabs-block/helpers';
import TabPaneEdit from './TabPaneEdit';

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
    tabId: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    render: () => (
      <Tab.Pane>
        <TabPaneEdit {...props} tabId={tab} />
      </Tab.Pane>
    ),
  }));

  const addNewTab = () => {
    const newData = {
      ...emptyTab(tabsData),
    };
    const items = newData.blocks_layout.items;
    onChangeBlock(block, {
      ...data,
      data: {
        ...newData,
      },
    });
    updateState({
      activeTab: items[items.length - 1],
    });
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
    updateState({
      activeTab: items[items.length - 1],
    });
  };

  return (
    <>
      {!data.menu_hidden ? (
        <Menu attached>
          {panes.map((pane) => (
            <Menu.Item
              name={pane.tabName}
              active={pane.tabId === activeTab}
              onClick={() => {
                updateState({
                  activeTab: pane.tabId,
                  activeBlock: null,
                  activeColumn: null,
                  colSelections: {},
                });
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
        </Menu>
      ) : (
        ''
      )}
      <Transition.Group animation="fade" duration={200}>
        {panes.map((pane) => (activeTab === pane.tabId ? pane.render() : ''))}
      </Transition.Group>
    </>
  );
};

export default DefaultTabEdit;
