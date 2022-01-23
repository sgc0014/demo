import { StyleRules } from '@material-ui/core/styles/withStyles';
import { ButtonClassKey } from '@material-ui/core/Button';

const MuiButton: Partial<StyleRules<ButtonClassKey, {}>> = {
  label: {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px'
  },
  containedPrimary: {
    backgroundColor: '#2a398d',
    borderRadious: '0px',
    '&:hover': {
      backgroundColor: '#2a398d'
    }
  },
  containedSecondary: {
    backgroundColor: '#F5F0E4',
    '&:hover': {
      backgroundColor: '#F5F0E4'
    }
  },
  outlinedPrimary: {
    border: ' 1px solid rgba(255, 255, 255, 0.5)',
    background: 'rgba(12, 22, 37, 0.6)',
    color: 'white',
    '&:hover': {
      border: ' 1px solid rgba(255, 255, 255, 0.5)'
    }
  },
  outlinedSecondary: { backgroundColor: 'rgba(0, 0, 0, 0.03)' },
  containedSizeLarge: {
    padding: '15px 50px'
  }
};

export default MuiButton;
