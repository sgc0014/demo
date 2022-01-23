import { StyleRules } from '@material-ui/core/styles/withStyles';
import { InputBaseClassKey } from '@material-ui/core/InputBase';

const MuiInputBase: Partial<StyleRules<InputBaseClassKey, {}>> = {
  root: {
    background: '#FFFFFF',
    '& :focus': {
      background: '#FFFFFF'
    }
  }
};

export default MuiInputBase;
