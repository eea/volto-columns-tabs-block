import codeSVG from '@plone/volto/icons/code.svg';
import {
  ColumnsTabsBlockEdit,
  ColumnsTabsBlockView,
  DefaultTabEdit,
  DefaultTabView,
  TabPaneEdit,
  TabPaneView,
} from './ColumnsTabsBlock';
import {
  CarouselTabHorizontal,
  CarouselTabVertical,
  carouselSchema,
} from '@eeacms/volto-columns-tabs-block/Themes';
import { variants } from './grid';
import { COLUMNS_TABS_BLOCK } from './constants';

import ColumnLayoutWidget from './Widgets/ColumnLayoutWidget';
import ColorPickerWidget from './Widgets/ColorPickerWidget';
import JsonTextWidget from './Widgets/JsonTextWidget';
import CssWidget from './Widgets/CssWidget';

export { TabPaneEdit, TabPaneView };

export default (config) => {
  config.blocks.blocksConfig[COLUMNS_TABS_BLOCK] = {
    id: COLUMNS_TABS_BLOCK,
    title: 'Columns tabs block',
    icon: codeSVG,
    group: 'common',
    view: ColumnsTabsBlockView,
    edit: ColumnsTabsBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    variants,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasOwnFocusManagement: true,
    themes: {
      default: {
        tabEdit: DefaultTabEdit,
        tabView: DefaultTabView,
      },
      carousel: {
        tabEdit: DefaultTabEdit,
        tabView: CarouselTabHorizontal,
        schema: carouselSchema,
      },
      carousel_vertical: {
        tabEdit: DefaultTabEdit,
        tabView: CarouselTabVertical,
        schema: carouselSchema,
      },
    },
    getBlocks: (data) => {
      const { blocks = {}, blocks_layout = {} } = data?.data;
      if (blocks_layout?.items?.length) {
        return {
          blocks: blocks_layout.items.map((block, index) => ({
            title: blocks[block]['title'] || `Tab ${index + 1}`,
            id: block,
            type: COLUMNS_TABS_BLOCK,
          })),
        };
      }
      return {};
    },
  };

  config.settings.hashlinkBlacklist = [
    ...(config.settings.hashlinkBlacklist || []),
    COLUMNS_TABS_BLOCK,
  ];

  config.widgets.widget.column_layout_object = ColumnLayoutWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;
  config.widgets.widget.json_text = JsonTextWidget;
  config.widgets.widget.css = CssWidget;

  return config;
};
