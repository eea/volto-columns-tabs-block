import React from 'react';
import { connect } from 'react-redux';
import { Menu, Tab } from 'semantic-ui-react';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import '@eeacms/volto-columns-tabs-block/less/menu.less';

const DefaultTabView = (props) => {
  const {
    data = {},
    theme = 'default',
    activeTab = null,
    setActiveTab,
    hashlink = {},
  } = props;
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

  React.useEffect(() => {
    if (hashlink.counter > 0) {
      const id = hashlink.hash || '';
      const index = tabs.indexOf(id);
      const parent = document.getElementById(props.id);
      const element = document.getElementById(id);
      if (id !== props.id && index > -1 && parent) {
        if (activeTabIndex !== index) {
          setActiveTab(id);
        }
        parent.scrollIntoView({ behavior: 'smooth' });
      } else if (id === props.id && element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    /* eslint-disable-next-line */
  }, [hashlink.counter]);

  return (
    <div
      className={cx(theme, {
        'full-width':
          data.full_width || tabsData.blocks?.[activeTab]?.ui_container,
      })}
      id={props.id}
    >
      <Tab
        menu={{
          className: cx(
            data.menu_alignment || 'left',
            data.menu_hidden ? 'menu-hidden' : '',
            data.full_width &&
              !data.ui_container &&
              !tabsData.blocks?.[activeTab]?.ui_container
              ? 'in-full-width'
              : '',
            data.ui_container || tabsData.blocks?.[activeTab]?.ui_container
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

export default connect((state) => {
  return {
    hashlink: state.hashlink,
  };
})(DefaultTabView);
