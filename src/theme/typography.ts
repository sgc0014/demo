import { createTheme } from '@material-ui/core/styles';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import palette from './palette';

const theme = createTheme();

const typography: TypographyOptions = {
  fontFamily: ['Roboto', 'sans-serif'].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '26px',
    letterSpacing: '.1em',
    lineHeight: '40px',
    textTransform: 'uppercase'
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '32px',
    letterSpacing: '-0.24px',
    lineHeight: '38px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '29px'
    }
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '24px',
    letterSpacing: '-0.06px',
    lineHeight: '28px'
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '18px',
    letterSpacing: '-0.05px',
    lineHeight: '21.6px'
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  subtitle1: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '18px',
    letterSpacing: '-0.05px',
    lineHeight: '22px'
  },
  subtitle2: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '19px'
  },
  body1: {
    color: palette.text.primary,
    fontSize: '18px',
    fontWeight: 300,
    letterSpacing: '-0.05px',
    lineHeight: '21px'
  },
  body2: {
    color: palette.text.primary,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    lineHeight: '14px'
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    lineHeight: '13px'
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px'
  }
};

export default typography;
