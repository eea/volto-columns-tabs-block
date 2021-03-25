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

import { StyleWrapperView } from '@eeacms/volto-block-style/StyleWrapper';

const TabPaneView = (props) => {
  const { data, tabId } = props;
  const metadata = props.metadata || props.properties;
  const tabsData = data.data;
  const activeTabData = tabsData.blocks[tabId];
  const columnList = getColumns(activeTabData);
  const { grid_size } = data;

  // const [height, setHeight] = useState(0);
  //
  // useEffect(() => {
  //   function handleResize() {
  //     let nav = document.querySelector('.header-wrapper');
  //     const menuHeight = nav.getBoundingClientRect().height;
  //     // 15 is because in CSS we had to remove the margin between blocks
  //     const tabHeight = window.innerHeight - menuHeight + 15;
  //     setHeight(tabHeight);
  //   }
  //
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <StyleWrapperView
      data={activeTabData}
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
        <div
          className="bg"
          style={{
            backgroundImage: `url(${activeTabData.grid_background_image}/@@images/image`,
          }}
        />
      ) : (
        ''
      )}
      <div className="grid-content-container">
        <StyleWrapperView
          data={activeTabData}
          styleData={{
            ...(activeTabData.grid_block_container_style || {}),
            customClass: cx(
              'grid-block-container',
              activeTabData.grid_block_container_style?.customClass || '',
              {
                'ui container': data.ui_container || activeTabData.ui_container,
                'in-full-width':
                  data.full_width &&
                  !data.ui_container &&
                  !activeTabData.ui_container,
              },
            ),
          }}
        >
          <Grid
            columns={grid_size}
            className="grid-block"
            verticalAlign={activeTabData.row_vertical_align}
          >
            <Grid.Row
              className={cx(
                'grid-row',
                getClasses(activeTabData.row_class_name, false, false),
              )}
              style={getStyle({
                justifyContent: activeTabData.row_justify_content,
              })}
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
                    <RenderBlocks
                      {...props}
                      metadata={metadata}
                      content={column}
                    />
                  </StyleWrapperView>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </StyleWrapperView>
      </div>
    </StyleWrapperView>
  );
};

export default TabPaneView;
