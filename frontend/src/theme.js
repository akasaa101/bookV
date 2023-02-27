const theme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6348',
    },
    secondary: {
      main: '#ffa502',
    },
    background: {
      default: '#ecf0f1',
      paper: '#ffffff',
    },
    text: {
      primary: '#2f3542',
      secondary: '#4a3a3a',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};

export default theme