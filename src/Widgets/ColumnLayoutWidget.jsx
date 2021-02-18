import React from 'react';
import NumberWidget from '@plone/volto/components/manage/Widgets/NumberWidget';

import '@eeacms/volto-columns-tabs-block/less/column-layout.less';

const ColumnLayoutWidget = (props) => {
  const layout = {
    small: 'Small',
    mobile: 'Mobile',
    tablet: 'Tablet',
    computer: 'Computer',
    largeScreen: 'Large screen',
    widescreen: 'Wide screen',
  };
  const layoutKeys = [
    'small',
    'mobile',
    'tablet',
    'computer',
    'largeScreen',
    'widescreen',
  ];
  return (
    <div
      id={`default-${props.id}`}
      className="inline field column-layout-object"
    >
      {layoutKeys.map((key) => (
        <NumberWidget
          onChange={(id, value) => {
            const data = { ...props.value };
            if (value < 13 && value > -1) {
              data[key] = parseInt(value);
              props.onChange(props.id, data);
            }
          }}
          title={layout[key]}
          value={props.value[key]}
          min={0}
          max={12}
        />
      ))}
    </div>
  );
};

export default ColumnLayoutWidget;
