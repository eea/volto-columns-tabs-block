import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import { emptyTab } from '@eeacms/volto-columns-tabs-block/helpers';
import { TabPaneEdit } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import '@eeacms/volto-columns-tabs-block/less/menu.less';

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
  const activeTabIndex = tabs.indexOf(activeTab);

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
      activeBlock: null,
      activeColumn: null,
      colSelections: {},
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
      activeBlock: null,
      activeColumn: null,
      colSelections: {},
    });
  };

  const panes = tabs?.map((tab, index) => ({
    id: tab,
    menuItem: () =>
      !data.menu_hidden ? (
        <>
          {index === 0 && data.menu_title ? (
            <Menu.Item className="menu-title">{data.menu_title}</Menu.Item>
          ) : (
            ''
          )}
          <Menu.Item
            name={tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`}
            active={tab === activeTab}
            onClick={() => {
              updateState({
                activeTab: tabs[index],
                activeBlock: null,
                activeColumn: null,
                colSelections: {},
              });
            }}
          >
            {tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`}
          </Menu.Item>
          {index === tabs.length - 1 ? (
            <>
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
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      ),
    render: () => (
      <Tab.Pane>
        <TabPaneEdit {...props} tabId={tab} />
      </Tab.Pane>
    ),
  }));

  return (
    <div
      className={cx({
        'full-width':
          data.full_width || tabsData.blocks?.[activeTab]?.row_ui_container,
      })}
    >
      <Tab
        menu={{ className: data.menu_alignment || 'left' }}
        panes={panes}
        activeIndex={activeTabIndex}
        onTabChange={(event, data) => {
          updateState({
            activeTab: tabs[data.activeIndex],
            activeBlock: null,
            activeColumn: null,
            colSelections: {},
          });
        }}
      />
    </div>
  );
};

export default DefaultTabEdit;
