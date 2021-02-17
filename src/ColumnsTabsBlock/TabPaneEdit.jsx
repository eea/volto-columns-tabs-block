import React from 'react';
import { Icon } from '@plone/volto/components';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { COLUMNS_TABS_BLOCK } from '@eeacms/volto-columns-tabs-block/constants';
import {
  emptyTabColumns,
  getColumns,
  getClasses,
  getStyle,
} from '@eeacms/volto-columns-tabs-block/helpers';
import { numberToWord } from '@eeacms/volto-columns-tabs-block/grid';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import { Grid, Button } from 'semantic-ui-react';
import { blocks } from '~/config';
import ColumnVariations from './ColumnVariations';
import EditBlockWrapper from './EditBlockWrapper';

import tuneSVG from '@plone/volto/icons/tune.svg';

const TabPaneEdit = (props) => {
  const {
    data,
    block,
    selected,
    pathname,
    tabId,
    colSelections,
    updateState,
    setSidebarTab,
    onChangeBlock,
    onChangeColumnData,
  } = props;
  const tabsData = data.data;
  const activeTabData = tabsData.blocks[tabId];
  const columnList = getColumns(activeTabData);
  const metadata = props.metadata || props.properties;
  const { grid_size } = data;

  const { variants } = blocks.blocksConfig[COLUMNS_TABS_BLOCK];

  const createFrom = (initialData) => {
    const { grid_cols } = initialData;
    return {
      data: emptyTabColumns(tabsData, tabId, grid_cols.length, grid_cols),
    };
  };

  return (
    <>
      {!Object.keys(activeTabData || {}).length ? (
        <ColumnVariations
          variants={variants}
          data={activeTabData}
          onChange={(initialData) => {
            createFrom(initialData);
            onChangeBlock(block, {
              ...data,
              ...createFrom(initialData),
            });
          }}
        />
      ) : (
        <Grid
          columns={grid_size}
          className={cx('grid-block')}
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
                  <BlocksForm
                    key={columnId}
                    metadata={metadata}
                    properties={isEmpty(column) ? emptyBlocksForm() : column}
                    selectedBlock={selected ? colSelections[columnId] : null}
                    onSelectBlock={(blockId) => {
                      updateState(
                        {
                          colSelections: {
                            [columnId]: blockId,
                          },
                          activeColumn: null,
                          activeBlock: null,
                        },
                        () => {
                          setSidebarTab(1);
                        },
                      );
                    }}
                    onChangeFormData={(newFormData) => {
                      onChangeBlock(block, {
                        ...data,
                        data: {
                          ...tabsData,
                          blocks: {
                            ...tabsData.blocks,
                            [tabId]: {
                              ...activeTabData,
                              blocks: {
                                ...activeTabData.blocks,
                                [columnId]: newFormData,
                              },
                            },
                          },
                        },
                      });
                    }}
                    onChangeField={(id, value) => {
                      onChangeColumnData(id, value, columnId);
                    }}
                    pathname={pathname}
                  >
                    {({ draginfo }, editBlock, blockProps) => (
                      <EditBlockWrapper
                        draginfo={draginfo}
                        blockProps={{
                          ...blockProps,
                          latest:
                            column.blocks_layout.items.indexOf(
                              blockProps.block,
                            ) ===
                            column.blocks_layout.items.length - 1,
                        }}
                        extraControls={
                          <>
                            <Button
                              icon
                              basic
                              title="Edit column"
                              onClick={() => {
                                updateState({
                                  activeColumn: columnId,
                                  activeBlock: null,
                                });
                                setSidebarTab(1);
                              }}
                            >
                              <Icon name={tuneSVG} size="19px" />
                            </Button>
                          </>
                        }
                      >
                        {editBlock}
                      </EditBlockWrapper>
                    )}
                  </BlocksForm>
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default TabPaneEdit;
