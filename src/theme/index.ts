import { createTheme } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

// Create a theme instance.
const theme = createTheme({
  palette,
  typography,
  overrides
});

export default theme;
