import React, { useState } from 'react';
import NumberWidget from '@plone/volto/components/manage/Widgets/NumberWidget';
import { v4 as uuid } from 'uuid';
import { omit, without } from 'lodash';
import move from 'lodash-move';
import { Grid, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { DragDropList } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { getColumns } from '@eeacms/volto-columns-tabs-block/helpers';
import cx from 'classnames';

import { ColumnLayoutSchema } from './schema';

import tuneSVG from '@plone/volto/icons/tune.svg';
import triangleSVG from '@plone/volto/icons/triangle.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import plusSVG from '@plone/volto/icons/circle-plus.svg';

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
