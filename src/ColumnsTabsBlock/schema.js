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
      fields: [
        'ui_container',
        'grid_class_name',
        'grid_background_image',
        'grid_css',
      ],
    },
    {
      id: 'advanced_row',
      title: 'Advanced Row style',
      fields: ['row_vertical_align', 'row_justify_content', 'row_css'],
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
    grid_class_name: {
      title: 'Class name',
      type: 'array',
      items: {
        choices: [],
      },
    },
    grid_background_image: {
      title: 'Background image',
      widget: 'object_by_path',
    },
    grid_margin: {
      title: 'Margin',
      widget: 'textarea',
    },
    grid_padding: {
      title: 'Padding',
      widget: 'textarea',
    },
    grid_background_color: {
      title: 'Background color',
      widget: 'color_picker',
    },
    grid_text_color: {
      title: 'Text color',
      widget: 'color_picker',
    },
    grid_css: {
      title: 'Style',
      widget: 'css',
    },
    row_ui_container: {
      title: 'UI container',
      type: 'boolean',
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
    row_class_name: {
      title: 'Class name',
      type: 'array',
      items: {
        choices: [],
      },
    },
    row_margin: {
      title: 'Margin',
      widget: 'textarea',
    },
    row_padding: {
      title: 'Padding',
      widget: 'textarea',
    },
    row_background_color: {
      title: 'Background color',
      widget: 'color_picker',
    },
    row_css: {
      title: 'Style',
      widget: 'css',
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
      fields: [
        'column_layout',
        // 'column_ui_container',
        // 'column_text_align',
        // 'column_class_name',
        // 'column_margin',
        // 'column_padding',
        // 'column_background_color',
        // 'column_text_color',
        'column_css',
      ],
    },
  ],
  properties: {
    column_layout: {
      title: 'Column layout',
      widget: 'column_layout_object',
    },
    column_ui_container: {
      title: 'UI container',
      type: 'boolean',
    },
    column_text_align: {
      title: 'Text align',
      type: 'array',
      choices: [
        ['left', 'Left'],
        ['center', 'Center'],
        ['right', 'Right'],
      ],
    },
    column_class_name: {
      title: 'Class name',
      type: 'array',
      items: {
        choices: [],
      },
    },
    column_margin: {
      title: 'Margin',
      widget: 'textarea',
    },
    column_padding: {
      title: 'Padding',
      widget: 'textarea',
    },
    column_background_color: {
      title: 'Background color',
      widget: 'color_picker',
    },
    column_text_color: {
      title: 'Text color',
      widget: 'color_picker',
    },
    column_css: {
      title: 'Style',
      widget: 'css',
    },
  },
  required: [],
});

export const BlockSchema = () => ({
  title: 'Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Advanced',
      fields: [
        'block_text_align',
        'block_class_name',
        'block_margin',
        'block_padding',
        'block_background_color',
        'block_text_color',
        'block_css',
      ],
    },
  ],
  properties: {
    block_text_align: {
      title: 'Text align',
      type: 'array',
      choices: [
        ['left', 'Left'],
        ['center', 'Center'],
        ['right', 'Right'],
      ],
    },
    block_class_name: {
      title: 'Class name',
      type: 'array',
      items: {
        choices: [],
      },
    },
    block_margin: {
      title: 'Margin',
      widget: 'textarea',
    },
    block_padding: {
      title: 'Padding',
      widget: 'textarea',
    },
    block_background_color: {
      title: 'Background color',
      widget: 'color_picker',
    },
    block_text_color: {
      title: 'Text color',
      widget: 'color_picker',
    },
    block_css: {
      title: 'Style',
      widget: 'css',
    },
  },
  required: [],
});
