import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const blue = '#2a398d';
const beige = '#f5f0e4';

const palette: PaletteOptions = {
  white,
  black,
  blue,
  beige,
  icon: '#eee',
  primary: {
    main: '#0086B9'
  },
  secondary: {
    main: '#FFFFFF'
  },
  text: {
    primary: '#2A398D',
    secondary: colors.blueGrey[600]
  },
  background: {
    default: white,
    paper: white
  },
  divider: colors.grey[200]
};

export default palette;
