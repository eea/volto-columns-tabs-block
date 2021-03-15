export const ColumnTabsSchema = (props, themes = []) => {
  return {
    title: 'Column tabs block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'initial_active_tab', 'full_width'],
      },
      {
        id: 'menu',
        title: 'Menu',
        fields: ['menu_title', 'menu_alignment', 'menu_hidden'],
      },
    ],
    properties: {
      theme: {
        title: 'Select a theme',
        type: 'array',
        choices: [...themes],
        default: 'default',
      },
      initial_active_tab: {
        title: 'Initial active tab',
        type: 'array',
        choices:
          props.data?.data?.blocks_layout?.items?.map((id, index) => [
            index,
            `Tab ${index + 1}`,
          ]) || [],
      },
      full_width: {
        title: 'Take full width',
        type: 'boolean',
      },
      menu_title: {
        title: 'Menu title',
        type: 'text',
      },
      menu_alignment: {
        title: 'Menu alignment',
        type: 'array',
        choices: [
          ['left', 'Left'],
          ['center', 'Center'],
          ['right', 'Right'],
          ['space-between', 'Space between'],
        ],
      },
      menu_hidden: {
        title: 'Menu hidden',
        type: 'boolean',
      },
    },
    required: [],
  };
};

export const TabSchema = () => ({
  title: 'Tab block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
    {
      id: 'advanced_grid',
      title: 'Advanced Grid style',
      fields: ['ui_container', 'grid_background_image'],
    },
    {
      id: 'advanced_row',
      title: 'Advanced Row style',
      fields: ['row_vertical_align', 'row_justify_content'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      type: 'text',
    },
    grid_size: {
      title: 'Grid size',
      type: 'number',
      minimum: 1,
      maximum: 12,
      onBlur: () => null,
      onClick: () => null,
    },
    data: {
      title: 'Columns',
      widget: 'column_layout',
    },
    ui_container: {
      title: 'Container',
      type: 'boolean',
    },
    grid_background_image: {
      title: 'Background image',
      widget: 'object_by_path',
    },
    row_vertical_align: {
      title: 'Vertical align',
      type: 'array',
      choices: [
        ['top', 'Top'],
        ['middle', 'Middle'],
        ['bottom', 'Bottom'],
      ],
    },
    row_justify_content: {
      title: 'Justify content',
      type: 'array',
      choices: [
        ['flex-start', 'Start'],
        ['center', 'Center'],
        ['flex-end', 'End'],
        ['space-around', 'Space around'],
        ['space-between', 'Space between'],
        ['space-evenly', 'Space evenly'],
      ],
    },
  },
  required: [],
});

export const ColumnSchema = () => ({
  title: 'Column',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['column_layout'],
    },
  ],
  properties: {
    column_layout: {
      title: 'Column layout',
      widget: 'column_layout_object',
    },
  },
  required: [],
});
