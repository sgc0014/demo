export default {
  root: {
    color: 'white',
    opacity: 0.9
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid #FF0066'
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: 'none'
    }
  }
};
