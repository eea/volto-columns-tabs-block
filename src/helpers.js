import { v4 as uuid } from 'uuid';
import isArray from 'lodash/isArray';
import transform from 'css-to-react-native';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { emptyBlocksForm } from '@plone/volto/helpers/Blocks/Blocks';

export const cssParser = (css) => {
  return new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(css, {})
      .then((result) => {
        const cssArray = [];
        result.root.nodes.forEach((node) => {
          if (node.prop && node.value) {
            cssArray.push([node.prop, node.value]);
          }
        });
        resolve(transform(cssArray));
      })
      .catch((error) => {
        reject({});
      });
  });
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const empty = (count, layouts) => {
  const tabId = uuid();
  const blocks = {};
  blocks[tabId] = {
    '@type': 'columns_tab',
    blocks: {},
    blocks_layout: {
      items: [],
    },
  };
  for (let x = 0; x < count; x++) {
    const columnId = uuid();
    blocks[tabId].blocks[columnId] = {
      ...emptyBlocksForm(),
      column_layout: { ...layouts[x] },
    };
    blocks[tabId].blocks_layout.items.push(columnId);
  }
  return {
    blocks,
    blocks_layout: {
      items: [tabId],
    },
  };
};

export const emptyTab = (data) => {
  const tabId = uuid();
  return {
    ...data,
    '@type': 'columns_tab',
    blocks: {
      ...data.blocks,
      [tabId]: {},
    },
    blocks_layout: {
      items: [...data.blocks_layout.items, tabId],
    },
  };
};

export const emptyTabColumns = (tabsData, tabId, count, layouts) => {
  const data = {
    blocks: {
      ...tabsData.blocks,
      [tabId]: {
        '@type': 'columns_tab',
        blocks: {},
        blocks_layout: {
          items: [],
        },
      },
    },
    blocks_layout: {
      ...tabsData.blocks_layout,
    },
  };
  for (let x = 0; x < count; x++) {
    const columnId = uuid();
    data.blocks[tabId].blocks[columnId] = {
      ...emptyBlocksForm(),
      column_layout: { ...layouts[x] },
    };
    data.blocks[tabId].blocks_layout.items.push(columnId);
  }
  return data;
};

export const getTabs = (data) => {
  return (data?.blocks_layout?.items || []).map((id) => [
    id,
    data.blocks?.[id],
  ]);
};

export const getColumns = (data) => {
  return (data?.blocks_layout?.items || []).map((id) => [
    id,
    data.blocks?.[id],
  ]);
};

export const getClasses = (classes, container, textAlign) => {
  const alignments = {
    left: 'left aligned',
    center: 'center aligned',
    right: 'right aligned',
    undefined: null,
    null: null,
  };
  const containers = {
    true: 'ui container',
    false: null,
    undefined: null,
    null: null,
  };
  const fullClassesArray = isArray(classes)
    ? [...classes, containers[container], alignments[textAlign]]
    : [containers[container], alignments[textAlign]];
  return fullClassesArray.filter((classname) => classname).join(' ');
};

export const getStyle = (data) => {
  const {
    style = {},
    margin = null,
    padding = null,
    backgroundColor = null,
    textColor = null,
    justifyContent = null,
  } = data;
  const newStyle = {};
  if (margin) newStyle.margin = margin;
  if (padding) newStyle.padding = padding;
  if (backgroundColor) newStyle.backgroundColor = backgroundColor;
  if (textColor) newStyle.color = textColor;
  if (justifyContent) newStyle.justifyContent = justifyContent;
  return {
    ...newStyle,
    ...style,
  };
};

export const scrollToTarget = (target, offsetHeight = 0) => {
  const bodyRect = document.body.getBoundingClientRect().top;
  const targetRect = target.getBoundingClientRect().top;
  const targetPosition = targetRect - bodyRect - offsetHeight;

  return window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};
