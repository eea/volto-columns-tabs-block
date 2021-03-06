import iconA from '@eeacms/volto-columns-tabs-block/icons/two-half-columns.svg';
import iconB from '@eeacms/volto-columns-tabs-block/icons/one-third-left.svg';
import iconC from '@eeacms/volto-columns-tabs-block/icons/one-third-right.svg';
import iconD from '@eeacms/volto-columns-tabs-block/icons/three-third-columns.svg';
import iconE from '@eeacms/volto-columns-tabs-block/icons/three-columns.svg';
import iconF from '@eeacms/volto-columns-tabs-block/icons/four-quarter-columns.svg';
import iconG from '@eeacms/volto-columns-tabs-block/icons/full-column.svg';

export const gridSizes = {
  full: {
    small: 12,
    mobile: 12,
    tablet: 12,
    computer: 12,
    largeScreen: 12,
    widescreen: 12,
  },
  halfWidth: {
    small: 12,
    mobile: 12,
    tablet: 6,
    computer: 6,
    largeScreen: 6,
    widescreen: 6,
  },
  twoThirds: {
    small: 12,
    mobile: 12,
    tablet: 8,
    computer: 8,
    largeScreen: 8,
    widescreen: 8,
  },
  oneThird: {
    small: 12,
    mobile: 12,
    tablet: 4,
    computer: 4,
    largeScreen: 4,
    widescreen: 4,
  },
  halfWidthBig: {
    small: 12,
    mobile: 12,
    tablet: 8,
    computer: 6,
    largeScreen: 6,
    widescreen: 6,
  },
  oneThirdSmall: {
    small: 12,
    mobile: 12,
    tablet: 2,
    computer: 3,
    largeScreen: 3,
    widescreen: 3,
  },
  oneQuarter: {
    small: 12,
    mobile: 12,
    tablet: 6,
    computer: 3,
    largeScreen: 3,
    widescreen: 3,
  },
  oneFifth: {
    small: 12,
    mobile: 12,
    tablet: 2,
    computer: 3,
    largeScreen: 3,
    widescreen: 3,
  },
  fourFifths: {
    small: 12,
    mobile: 12,
    tablet: 10,
    computer: 9,
    largeScreen: 9,
    widescreen: 9,
  },
};

export const variants = [
  {
    icon: iconA,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.halfWidth, gridSizes.halfWidth],
    },
    title: '50 / 50',
  },
  {
    icon: iconB,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.oneFifth, gridSizes.fourFifths],
    },
    title: '20 / 80',
  },
  {
    icon: iconB,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.oneThird, gridSizes.twoThirds],
    },
    title: '30 / 70',
  },
  {
    icon: iconC,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.twoThirds, gridSizes.oneThird],
    },
    title: '70 / 30',
  },
  {
    icon: iconC,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.fourFifths, gridSizes.oneFifth],
    },
    title: '80 / 20',
  },
  {
    icon: iconD,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.oneThird, gridSizes.oneThird, gridSizes.oneThird],
    },
    title: '33 / 33 / 33',
  },
  {
    icon: iconE,
    defaultData: {
      grid_size: 12,
      grid_cols: [
        gridSizes.oneThirdSmall,
        gridSizes.halfWidthBig,
        gridSizes.oneThirdSmall,
      ],
    },
    title: '25 / 50 / 25',
  },
  {
    icon: iconF,
    defaultData: {
      grid_size: 12,
      grid_cols: [
        gridSizes.oneQuarter,
        gridSizes.oneQuarter,
        gridSizes.oneQuarter,
        gridSizes.oneQuarter,
      ],
    },
    title: '25 / 25 / 25 / 25',
  },
  {
    icon: iconG,
    defaultData: {
      grid_size: 12,
      grid_cols: [gridSizes.full],
    },
    title: '100',
  },
];

export const numberToWord = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
};
