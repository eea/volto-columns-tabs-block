import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import '@eeacms/volto-columns-tabs-block/less/menu.less';

const DefaultTabView = (props) => {
  const { data = {}, activeTab = null, setActiveTab } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];
  const activeTabIndex = tabs.indexOf(activeTab);

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
              setActiveTab(tabs[index]);
            }}
          >
            {tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`}
          </Menu.Item>
        </>
      ) : (
        ''
      ),
    render: () => (
      <Tab.Pane>
        <TabPaneView {...props} tabId={tab} />
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
        menu={{
          className: cx(
            data.menu_alignment || 'left',
            data.menu_hidden ? 'menu-hidden' : '',
            tabsData.blocks?.[activeTab]?.row_ui_container
              ? 'ui container'
              : '',
          ),
        }}
        panes={panes}
        activeIndex={activeTabIndex}
        onTabChange={(event, data) => {
          setActiveTab(tabs[data.activeIndex]);
        }}
      />
    </div>
  );
};

export default DefaultTabView;
