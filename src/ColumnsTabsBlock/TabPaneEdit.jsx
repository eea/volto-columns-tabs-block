import React from 'react';
import { Icon } from '@plone/volto/components';
import BlocksForm from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
import { emptyBlocksForm } from '@plone/volto/helpers/Blocks/Blocks';
import { StyleWrapperView } from '@eeacms/volto-block-style/StyleWrapper';
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
import config from '@plone/volto/registry';
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

  const { variants } = config.blocks.blocksConfig[COLUMNS_TABS_BLOCK];

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
        <StyleWrapperView
          data={{ '@type': 'grid-block-wrapper' }}
          styleData={{
            ...(activeTabData.grid_block_wrapper_style || {}),
            customClass: cx(
              'grid-block-wrapper',
              activeTabData.grid_block_wrapper_style?.customClass || '',
            ),
            customId: tabId,
          }}
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
          <StyleWrapperView
            data={{ '@type': 'grid-block-container' }}
            styleData={{
              ...(activeTabData.grid_block_container_style || {}),
              customClass: cx(
                'grid-block-container',
                activeTabData.grid_block_container_style?.customClass || '',
                {
                  'ui container':
                    data.ui_container || activeTabData.ui_container,
                  'in-full-width':
                    data.full_width &&
                    !data.ui_container &&
                    !activeTabData.ui_container,
                },
              ),
            }}
          >
            <Grid columns={grid_size} className={cx('grid-block')}>
              <Grid.Row
                className={cx(
                  'grid-row',
                  getClasses(activeTabData.row_class_name, false, false),
                )}
                style={getStyle({
                  justifyContent: activeTabData.row_justify_content,
                })}
                verticalAlign={activeTabData.row_vertical_align}
              >
                {columnList.map(([columnId, column], index) => (
                  <Grid.Column
                    key={columnId}
                    className={cx(
                      'grid-column',
                      `${numberToWord[column.column_layout.small]} wide small`,
                    )}
                    textAlign={column.column_text_align}
                    mobile={column.column_layout.mobile}
                    tablet={column.column_layout.tablet}
                    computer={column.column_layout.computer}
                    largeScreen={column.column_layout.largeScreen}
                    widescreen={column.column_layout.widescreen}
                  >
                    <StyleWrapperView
                      data={activeTabData}
                      styleData={{
                        customClass: cx('grid-column-wrapper'),
                      }}
                    >
                      <BlocksForm
                        key={columnId}
                        metadata={metadata}
                        properties={
                          isEmpty(column) ? emptyBlocksForm() : column
                        }
                        selectedBlock={
                          selected ? colSelections[columnId] : null
                        }
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
                    </StyleWrapperView>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </StyleWrapperView>
        </StyleWrapperView>
      )}
    </>
  );
};

export default TabPaneEdit;
