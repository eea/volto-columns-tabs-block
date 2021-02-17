import React, { useState } from 'react';
import { getTabs } from '@eeacms/volto-columns-tabs-block/helpers';
import { COLUMNS_TABS_BLOCK } from '@eeacms/volto-columns-tabs-block/constants';
import { blocks } from '~/config';
import DefaultTabView from './DefaultTabView';

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
  const [activeTab, setActiveTab] = useState(initTab(props.data));
  const theme = props.data.theme || 'default';

  const RenderTabEdit =
    blocks.blocksConfig[COLUMNS_TABS_BLOCK].themes[theme]?.tabView ||
    DefaultTabView;

  return (
    <div className="columns-tabs-container">
      <RenderTabEdit
        {...props}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default View;
