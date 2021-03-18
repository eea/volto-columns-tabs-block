import React, { useState } from 'react';
import { getTabs } from '@eeacms/volto-columns-tabs-block/helpers';
import { COLUMNS_TABS_BLOCK } from '@eeacms/volto-columns-tabs-block/constants';
import config from '@plone/volto/registry';
import DefaultTabView from './DefaultTabView';
import { BodyClass } from '@plone/volto/helpers';
import { StyleWrapperView } from '@eeacms/volto-block-style/StyleWrapper';

import cx from 'classnames';

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
    <StyleWrapperView
      {...props}
      data={data}
      styleData={{
        ...data.styles,
        customClass: cx(
          data.styles?.customClass || '',
          'columns-tabs-container',
        ),
      }}
    >
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
        theme={data.theme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </StyleWrapperView>
  );
};

export default View;
