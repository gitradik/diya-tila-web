import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  palette: {
    primary: {
      main: `#ffffff`, // White color as the primary main color
      contrastText: `#000000`, // Text color to contrast with white background
    },
    secondary: {
      main: `#333333`, // Dark shade color as the secondary main color
      contrastText: `#ffffff`, // Text color to contrast with dark background
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          padding: `10px 24px`,
        },
        root: {
          ':focus': {
            outline: `none`,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ':focus': {
            outline: `none`,
          },
        },
      },
    },
  },
});
