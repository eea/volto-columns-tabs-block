import React from 'react';
import { Tab, Menu, Transition } from 'semantic-ui-react';
import TabPaneView from './TabPaneView';

const DefaultTabEdit = (props) => {
  const { data = {}, activeTab = null, setActiveTab } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];

  const panes = tabs?.map((tab, index) => ({
    tabId: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    render: () => (
      <Tab.Pane>
        <TabPaneView {...props} tabId={tab} />
      </Tab.Pane>
    ),
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
      <Transition.Group animation="fade" duration={200}>
        {panes.map((pane) => (activeTab === pane.tabId ? pane.render() : ''))}
      </Transition.Group>
    </>
  );
};

export default DefaultTabEdit;
