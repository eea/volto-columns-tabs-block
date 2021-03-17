import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Tab } from 'semantic-ui-react';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import cx from 'classnames';

import '@eeacms/volto-columns-tabs-block/less/menu.less';

const DefaultTabView = (props) => {
  const history = useHistory();
  const tab = React.useRef(props.activeTab);
  const {
    data = {},
    theme = 'default',
    activeTab = null,
    setActiveTab,
  } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];
  const activeTabIndex = tabs.indexOf(activeTab);

  const onHashChange = (location) => {
    const activeTabIndex = tabs.indexOf(tab.current);
    const id = location.hash.substring(1);
    const index = tabs.indexOf(id);
    if (id !== props.id && activeTabIndex !== index && index > -1) {
      setActiveTab(id);
    }
  };

  React.useEffect(() => {
    tab.current = activeTab;
  }, [activeTab]);

  React.useEffect(() => {
    const unlisten = history.listen((location, action) => {
      onHashChange(location);
    });
    onHashChange(history.location);
    return () => {
      unlisten();
    };
    /* eslint-disable-next-line */
  }, []);

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
            data.full_width && !tabsData.blocks?.[activeTab]?.ui_container
              ? 'in-full-width'
              : '',
            tabsData.blocks?.[activeTab]?.ui_container ? 'ui container' : '',
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
