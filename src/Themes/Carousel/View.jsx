import React from 'react';
import { useHistory } from 'react-router-dom';
import loadable from '@loadable/component';
import { Menu } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { TabPaneView } from '@eeacms/volto-columns-tabs-block';
import { BodyClass } from '@plone/volto/helpers';
import cx from 'classnames';

import scrollSVG from '@eeacms/volto-columns-tabs-block/icons/scroll.svg';
import rightKeySVG from '@plone/volto/icons/right-key.svg';
import leftKeySVG from '@plone/volto/icons/left-key.svg';
import '@eeacms/volto-columns-tabs-block/less/carousel.less';
import 'slick-carousel/slick/slick.css';

const Slider = loadable(() => import('react-slick'));

const View = (props) => {
  const history = useHistory();
  const tab = React.useRef(props.activeTab);
  const slider = React.useRef(null);
  const {
    data = {},
    theme = 'default',
    activeTab = null,
    setActiveTab,
  } = props;
  const tabsData = data?.data;
  const tabs = tabsData?.blocks_layout?.items || [];
  const activeTabIndex = tabs.indexOf(activeTab);
  const hasScrollIcon = data.scrollIcon;
  const color = data.color || 'light';

  const panes = tabs?.map((tab, index) => ({
    id: tab,
    tabName: tabsData?.blocks?.[tab]?.title || `Tab ${index + 1}`,
    renderItem: <TabPaneView {...props} tabId={tab} />,
  }));

  const settings = {
    speed: 400,
    arrows: false,
    swipe: true,
    touchMove: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    beforeChange: (oldIndex, index) => {
      setActiveTab(tabs[index]);
    },
  };

  const onHashChange = (location) => {
    const activeTabIndex = tabs.indexOf(tab.current);
    const id = location.hash.substring(1);
    const index = tabs.indexOf(id);
    if (id !== props.id && activeTabIndex !== index && index > -1) {
      slider.current.slickGoTo(index);
    }
  };

  React.useEffect(() => {
    tab.current = activeTab;
  }, [activeTab]);

  React.useEffect(() => {
    const unlisten = history.listen((location, action) => {
      onHashChange(location);
    });
    onHashChange(history.location);
    return () => {
      unlisten();
    };
    /* eslint-disable-next-line */
  }, []);

  return (
    <div
      className={cx(theme, {
        'full-width':
          data.full_width || tabsData.blocks?.[activeTab]?.ui_container,
      })}
    >
      <BodyClass className="has-carousel" />
      <Slider {...settings} ref={slider}>
        {panes.length ? panes.map((pane) => pane.renderItem) : ''}
      </Slider>
      <div className={cx('carousel-slider', color)}>
        {activeTabIndex > 0 ? (
          <Icon
            className="left-arrow"
            onClick={() => {
              if (slider.current) {
                slider.current.slickGoTo(activeTabIndex - 1);
              }
            }}
            name={leftKeySVG}
            size="60px"
            color="white"
          />
        ) : (
          <span />
        )}
        {activeTabIndex < tabs.length - 1 ? (
          <Icon
            className="right-arrow"
            onClick={() => {
              if (slider.current) {
                slider.current.slickGoTo(activeTabIndex + 1);
              }
            }}
            name={rightKeySVG}
            size="60px"
            color="white"
          />
        ) : (
          <span />
        )}
      </div>
      <div className={cx('carousel-menu', color)}>
        <Menu attached>
          {panes.map((pane, index) => (
            <Menu.Item
              active={activeTabIndex === index}
              onClick={() => {
                if (slider.current && activeTabIndex !== index) {
                  slider.current.slickGoTo(index);
                }
              }}
            >
              {hasScrollIcon &&
              panes.length % 2 > 0 &&
              index + 1 === Math.round(panes.length / 2) ? (
                <Icon
                  className="scroll"
                  name={scrollSVG}
                  size="30px"
                  color="white"
                />
              ) : (
                ''
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default View;
