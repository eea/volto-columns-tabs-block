import codeSVG from '@plone/volto/icons/code.svg';
import {
  ColumnsTabsBlockEdit,
  ColumnsTabsBlockView,
  DefaultTabEdit,
  DefaultTabView,
} from './ColumnsTabsBlock';
import { variants } from './grid';
import { COLUMNS_TABS_BLOCK } from './constants';

import ColumnLayoutWidget from './Widgets/ColumnLayoutWidget';
import ColorPickerWidget from './Widgets/ColorPickerWidget';
import JsonTextWidget from './Widgets/JsonTextWidget';
import CssWidget from './Widgets/CssWidget';

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
    },
  };

  config.widgets.widget.column_layout_object = ColumnLayoutWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;
  config.widgets.widget.json_text = JsonTextWidget;
  config.widgets.widget.css = CssWidget;

  return config;
};
