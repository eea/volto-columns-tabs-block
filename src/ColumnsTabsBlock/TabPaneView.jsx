import React from 'react';
import { RenderBlocks } from '@eeacms/volto-columns-tabs-block/components';
import {
  getColumns,
  getClasses,
  getStyle,
} from '@eeacms/volto-columns-tabs-block/helpers';
import { numberToWord } from '@eeacms/volto-columns-tabs-block/grid';
import cx from 'classnames';
import { Grid } from 'semantic-ui-react';

const TabPaneView = (props) => {
  const { data, tabId } = props;
  const metadata = props.metadata || props.properties;
  const tabsData = data.data;
  const activeTabData = tabsData.blocks[tabId];
  const columnList = getColumns(activeTabData);
  const { grid_size } = data;

  return (
    <Grid
      columns={grid_size}
      className={cx(
        'grid-block',
        getClasses(activeTabData.grid_class_name),
        activeTabData.row_ui_container ? 'row-ui-container' : '',
      )}
      style={getStyle({
        style: activeTabData.grid_css?.style,
        margin: activeTabData.grid_margin,
        padding: activeTabData.grid_padding,
        backgroundColor: activeTabData.grid_background_color?.active
          ? activeTabData.grid_background_color.color
          : null,
        textColor: activeTabData.grid_text_color?.active
          ? activeTabData.grid_text_color.color
          : null,
      })}
    >
      {activeTabData.grid_background_image ? (
        <img
          className="bg"
          src={`${activeTabData.grid_background_image}/@@images/image`}
          alt="test"
        />
      ) : (
        ''
      )}
      <Grid.Row
        className={cx(
          'grid-row',
          getClasses(
            activeTabData.row_class_name,
            activeTabData.row_ui_container || false,
            false,
          ),
        )}
        style={getStyle({
          style: activeTabData.row_css?.style,
          margin: activeTabData.row_margin,
          padding: activeTabData.row_padding,
          backgroundColor: activeTabData.row_background_color?.active
            ? activeTabData.row_background_color.color
            : null,
          textColor: null,
          textAlign: null,
          justifyContent: activeTabData.row_justify_content,
        })}
        verticalAlign={activeTabData.row_vertical_align}
      >
        {columnList.map(([columnId, column], index) => (
          <Grid.Column
            className={cx(
              'grid-column',
              `${numberToWord[column.column_layout.small]} wide small`,
              getClasses(
                column.column_class_name,
                column.column_ui_container || false,
                false,
              ),
            )}
            textAlign={column.column_text_align}
            style={getStyle({
              style: column.column_css?.style,
              margin: column.column_margin,
              padding: column.column_padding,
              backgroundColor: null,
              textColor: column.column_text_color?.active
                ? column.column_text_color.color
                : null,
            })}
            key={columnId}
            mobile={column.column_layout.mobile}
            tablet={column.column_layout.tablet}
            computer={column.column_layout.computer}
            largeScreen={column.column_layout.largeScreen}
            widescreen={column.column_layout.widescreen}
          >
            <div
              className={cx('grid-column-wrapper')}
              style={getStyle({
                style: {},
                margin: null,
                padding: null,
                backgroundColor: column.column_background_color?.active
                  ? column.column_background_color.color
                  : null,
                textColor: null,
              })}
            >
              <RenderBlocks {...props} metadata={metadata} content={column} />
            </div>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};

export default TabPaneView;
