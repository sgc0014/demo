import { StyleRules } from '@material-ui/core/styles/withStyles';
import { IconButtonClassKey } from '@material-ui/core/IconButton';
import palette from '../palette';

const MuiIconButton: Partial<StyleRules<IconButtonClassKey, {}>> = {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)'
    }
  }
};

export default MuiIconButton;
