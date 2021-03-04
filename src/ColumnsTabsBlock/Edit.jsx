import React from 'react';
import { connect } from 'react-redux';
import { SidebarPortal, Icon } from '@plone/volto/components';
import { setSidebarTab } from '@plone/volto/actions';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { COLUMNS_TABS_BLOCK } from '@eeacms/volto-columns-tabs-block/constants';
import { empty, getTabs } from '@eeacms/volto-columns-tabs-block/helpers';
import cx from 'classnames';
import { Segment, Button } from 'semantic-ui-react';
import { blocks, settings } from '~/config';
import ColumnVariations from './ColumnVariations';
import DefaultTabEdit from './DefaultTabEdit';
import View from './View';
import { ColumnTabsSchema, TabSchema, ColumnSchema } from './schema';

import upSVG from '@plone/volto/icons/up.svg';
import copySVG from '@plone/volto/icons/copy.svg';
import pasteSVG from '@plone/volto/icons/paste.svg';
import enterSVG from '@plone/volto/icons/enter.svg';
import showSVG from '@plone/volto/icons/show.svg';
import hideSVG from '@plone/volto/icons/hide.svg';

import '@eeacms/volto-columns-tabs-block/less/grid-block.less';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.initTab = this.initTab.bind(this);
    this.createFrom = this.createFrom.bind(this);
    this.onChangeTabField = this.onChangeTabField.bind(this);
    this.onChangeColumnField = this.onChangeColumnField.bind(this);
    this.onChangeColumnData = this.onChangeColumnData.bind(this);
    this.updateState = this.updateState.bind(this);
    this.copyData = this.copyData.bind(this);
    this.pasteData = this.pasteData.bind(this);
    this.state = {
      activeTab: this.initTab(),
      activeColumn: null,
      activeBlock: null,
      colSelections: {},
      preview: false,
    };
    this.gridBlockContainer = React.createRef();
    this.blocksState = {};
  }

  initTab = () => {
    const tabsData = this.props.data?.data;
    const tabList = getTabs(tabsData);
    const tabs = tabList.map(([tabId, tab], index) => tabId);
    if (tabs.length) {
      return tabs[0];
    }
    return null;
  };

  createFrom = (initialData) => {
    const { grid_cols, grid_size } = initialData;
    const newForm = {
      data: empty(grid_cols.length, grid_cols),
      grid_size,
    };
    this.setState({ activeTab: newForm.data.blocks_layout.items[0] });
    return newForm;
  };

  onChangeTabField = (id, value) => {
    const { data, onChangeBlock, block } = this.props;
    const tabId = this.state.activeTab;
    const tabsData = data.data;
    onChangeBlock(block, {
      ...data,
      data: {
        ...tabsData,
        blocks: {
          ...tabsData.blocks,
          [tabId]: {
            ...tabsData.blocks?.[tabId],
            [id]: value,
          },
        },
      },
    });
  };

  onChangeColumnField = (id, value) => {
    const { data, onChangeBlock, block } = this.props;
    const tabsData = data.data;
    const tabId = this.state.activeTab;
    const columnId = this.state.activeColumn;
    onChangeBlock(block, {
      ...data,
      data: {
        ...tabsData,
        blocks: {
          ...tabsData?.blocks,
          [tabId]: {
            ...tabsData?.blocks?.[tabId],
            blocks: {
              ...tabsData?.blocks?.[tabId]?.blocks,
              [columnId]: {
                ...tabsData?.blocks?.[tabId]?.blocks?.[columnId],
                [id]: value,
              },
            },
          },
        },
      },
    });
  };

  onChangeColumnData = (id, value, columnId) => {
    const { data, onChangeBlock, block, onChangeField } = this.props;
    const tabId = this.state.activeTab;
    const tabsData = data.data;
    const columnsData = tabsData.blocks?.[tabId];
    // special handling of blocks and blocks_layout
    if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
      this.blocksState[id] = value;
      onChangeBlock(block, {
        ...data,
        data: {
          ...tabsData,
          blocks: {
            ...tabsData?.blocks,
            [tabId]: {
              ...columnsData,
              blocks: {
                ...columnsData?.blocks,
                [columnId]: {
                  ...columnsData?.blocks?.[columnId],
                  ...this.blocksState,
                },
              },
            },
          },
        },
      });
    } else {
      onChangeField(id, value);
    }
  };

  updateState = (data) => {
    this.setState({ ...data });
  };

  copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(this.props.data));
  };

  pasteData = () => {
    navigator.clipboard.readText().then((text) => {
      try {
        const newData = JSON.parse(text);
        if (newData['@type'] === COLUMNS_TABS_BLOCK) {
          this.props.onChangeBlock(this.props.block, {
            ...newData,
          });
        }
      } catch {}
    });
  };

  render() {
    const { data, block, selected, onChangeBlock, onAddBlock } = this.props;
    const themes = Object.keys(
      blocks.blocksConfig[COLUMNS_TABS_BLOCK].themes,
    ).map((theme) => [theme, theme]);
    const theme = data.theme || 'default';
    const tabsData = data.data;

    const activeTabData = tabsData?.blocks?.[this.state.activeTab];

    const activeColumnData = this.state.activeColumn
      ? activeTabData?.blocks?.[this.state.activeColumn]
      : {};

    const { variants } = blocks.blocksConfig[COLUMNS_TABS_BLOCK];

    const tabProps = {
      ...this.props,
      activeTab: this.state.activeTab,
      colSelections: this.state.colSelections,
      onChangeColumnData: this.onChangeColumnData,
      updateState: this.updateState,
    };

    const RenderTabEdit =
      blocks.blocksConfig[COLUMNS_TABS_BLOCK].themes[theme]?.tabEdit ||
      DefaultTabEdit;

    const themeSchema =
      blocks.blocksConfig[COLUMNS_TABS_BLOCK].themes[theme]?.schema;

    return (
      <div
        role="presentation"
        className={cx(
          'columns-tabs-container',
          this.state.preview ? 'view' : 'edit',
        )}
        ref={this.gridBlockContainer}
      >
        {!Object.keys(data.data || {}).length ? (
          <ColumnVariations
            variants={variants}
            data={data}
            onChange={(initialData) => {
              onChangeBlock(block, {
                ...data,
                ...this.createFrom(initialData),
              });
            }}
          />
        ) : this.state.preview ? (
          <View {...this.props} />
        ) : (
          <RenderTabEdit {...tabProps} />
        )}

        {selected &&
        this.state.activeTab &&
        !this.state.activeColumn &&
        Object.keys(this.state.colSelections).length === 0 ? (
          <SidebarPortal selected={selected}>
            <div className="columns-tabs-sidebar no-inline-form-header">
              <Segment>
                <header className="header pulled">
                  <h2>{ColumnTabsSchema(this.props, themes).title}</h2>
                </header>
                <div className="buttons-wrapper">
                  <Button
                    icon
                    basic
                    title="Add new block below the columns tabs"
                    onClick={() => {
                      onAddBlock(
                        settings.defaultBlockType,
                        this.props.index + 1,
                      );
                    }}
                  >
                    <Icon name={enterSVG} size="22px" />
                  </Button>
                  <Button
                    icon
                    basic
                    title="Copy columns tabs data"
                    onClick={this.copyData}
                  >
                    <Icon name={copySVG} size="22px" />
                  </Button>
                  <Button
                    icon
                    basic
                    title="Paste columns tabs data"
                    onClick={this.pasteData}
                  >
                    <Icon name={pasteSVG} size="22px" />
                  </Button>
                  <Button
                    icon
                    basic
                    title={this.state.preview ? 'Hide preview' : 'Show preview'}
                    onClick={() => {
                      this.setState({ preview: !this.state.preview });
                    }}
                  >
                    <Icon
                      name={this.state.preview ? showSVG : hideSVG}
                      size="22px"
                    />
                  </Button>
                </div>
              </Segment>
              <InlineForm
                schema={ColumnTabsSchema(this.props, themes)}
                title="Column tabs block"
                onChangeField={(id, value) => {
                  onChangeBlock(block, {
                    ...data,
                    [id]: value,
                  });
                }}
                formData={data}
              />
              {themeSchema ? (
                <>
                  <Segment>
                    <header className="header pulled">
                      <h2>{themeSchema.title}</h2>
                    </header>
                  </Segment>
                  <InlineForm
                    schema={themeSchema}
                    title={themeSchema.title}
                    onChangeField={(id, value) => {
                      onChangeBlock(block, {
                        ...data,
                        [id]: value,
                      });
                    }}
                    formData={data}
                  />
                </>
              ) : (
                ''
              )}
              <Segment>
                <header className="header pulled">
                  <h2>
                    {TabSchema().title +
                      ` (${this.state.activeTab.substring(0, 4)}...)`}
                  </h2>
                </header>
                <Button
                  style={{ margin: '1em' }}
                  title="This action will remove all the data from the tab!"
                  onClick={() => {
                    if (
                      // eslint-disable-next-line no-alert
                      window.confirm(
                        'Are you sure you want to select a template?\nThis action will remove all the data from the tab!',
                      )
                    ) {
                      onChangeBlock(block, {
                        ...data,
                        data: {
                          ...tabsData,
                          blocks: {
                            ...tabsData?.blocks,
                            [this.state.activeTab]: {},
                          },
                        },
                      });
                    }
                  }}
                >
                  Apply tab template
                </Button>
              </Segment>
              <InlineForm
                className="test"
                schema={TabSchema()}
                title="Tab block"
                onChangeField={(id, value) => {
                  this.onChangeTabField(id, value);
                }}
                formData={activeTabData}
              />
            </div>
          </SidebarPortal>
        ) : selected && this.state.activeColumn && !this.state.activeBlock ? (
          <SidebarPortal selected={true}>
            <div className="columns-tabs-sidebar">
              <Segment>
                <Button
                  onClick={() =>
                    this.setState({
                      activeColumn: null,
                      activeBlock: null,
                      colSelections: {},
                    })
                  }
                >
                  <Icon name={upSVG} size="14px" />
                  Edit Tab block
                </Button>
              </Segment>
              <InlineForm
                schema={ColumnSchema()}
                title={`Column ${
                  activeTabData.blocks_layout.items.indexOf(
                    this.state.activeColumn,
                  ) + 1
                }`}
                onChangeField={(id, value) => {
                  this.onChangeColumnField(id, value);
                }}
                formData={activeColumnData}
              />
            </div>
          </SidebarPortal>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    return {};
  },
  { setSidebarTab },
)(Edit);
