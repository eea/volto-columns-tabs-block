export default {
  title: 'Carousel properties',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['auto', 'duration'],
    },
  ],
  properties: {
    auto: {
      title: 'Auto transition',
      type: 'boolean',
    },
    duration: {
      title: 'Transition duration',
      type: 'text',
      description: 'Applies only if auto transition is enabled',
    },
  },
  required: [],
};
