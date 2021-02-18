import React, { useEffect, useState, useRef } from 'react';
import { Menu, Transition } from 'semantic-ui-react';
import { emptyTab } from '@eeacms/volto-columns-tabs-block/helpers';
import TabPaneEdit from './TabPaneEdit';
import cx from 'classnames';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const DefaultTabEdit = (props) => {
  const [state, setState] = useState({
    placeholderHeight: 0,
    exitingTab: null,
  });
  const [prevActiveTabState, setPrevActiveTabState] = useState(null);
  const {
    data = {},
    activeTab = null,
    block,
    updateState,
    onChangeBlock,
  } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];

  const prevActiveTab = usePrevious(activeTab);
  const activeTabIndex = tabs.indexOf(activeTab);
  const prevActiveTabIndex = tabs.indexOf(prevActiveTabState);

  useEffect(() => {
    setPrevActiveTabState(prevActiveTab);
    /* eslint-disable-next-line */
  }, [activeTab]);

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
      {tabs.length
        ? tabs?.map((tab, index) => (
            <Transition
              key={tab}
              animation={`slide ${getDirection(index)}`}
              duration={{ hide: 500, show: 500 }}
              visible={tab === activeTab}
              onHide={(event, data) => {
                if (data.status === 'EXITED') {
                  setTimeout(() => {
                    setState({
                      placeholderHeight: 0,
                      exitingTab: null,
                    });
                  }, 1);
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
                    : '',
                )}
              >
                <TabPaneEdit {...props} tabId={tab} />
              </div>
            </Transition>
          ))
        : ''}
      <div
        id="transition-placeholder"
        style={{ height: state.placeholderHeight }}
      />
    </>
  );
};

export default DefaultTabEdit;
