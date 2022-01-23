import { StyleRules } from '@material-ui/core/styles/withStyles';
import { PaperClassKey } from '@material-ui/core/Paper';

const MuiPaper: Partial<StyleRules<PaperClassKey, {}>> = {
  elevation1: {
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)'
  }
};

export default MuiPaper;
