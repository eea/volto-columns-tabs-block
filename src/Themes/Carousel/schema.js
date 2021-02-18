export default {
  title: 'Carousel properties',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['scrollIcon', 'color'],
    },
  ],
  properties: {
    scrollIcon: {
      title: 'Scroll icon',
      type: 'boolean',
    },
    color: {
      title: 'Color',
      type: 'array',
      choices: [
        ['light', 'Light'],
        ['dark', 'Dark'],
        ['grey', 'Grey'],
      ],
      default: 'light',
    },
  },
  required: [],
};
