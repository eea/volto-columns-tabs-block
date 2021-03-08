import React, { useState } from 'react';
import { getTabs } from '@eeacms/volto-columns-tabs-block/helpers';
import { COLUMNS_TABS_BLOCK } from '@eeacms/volto-columns-tabs-block/constants';
import config from '@plone/volto/registry';
import DefaultTabView from './DefaultTabView';
import { BodyClass } from '@plone/volto/helpers';

import '@eeacms/volto-columns-tabs-block/less/grid-block.less';

const initTab = (data) => {
  const tabsData = data?.data;
  const tabList = getTabs(tabsData);
  const tabs = tabList.map(([tabId, tab], index) => tabId);
  if (tabs.length) {
    return tabs[0];
  }
  return null;
};

const View = (props) => {
  const { data = {} } = props;
  const [activeTab, setActiveTab] = useState(initTab(data));
  const tabsData = data?.data;
  const theme = props.data.theme || 'default';

  const RenderTabView =
    config.blocks.blocksConfig[COLUMNS_TABS_BLOCK].themes[theme]?.tabView ||
    DefaultTabView;

  return (
    <div className="columns-tabs-container">
      <BodyClass
        className={
          props.data.full_width ||
          tabsData.blocks?.[activeTab]?.row_ui_container
            ? 'overlay-scrollbar'
            : ''
        }
      />
      <RenderTabView
        {...props}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default View;
