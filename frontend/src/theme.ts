import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1b1b1b",
    },
    secondary: {
      main: "#0065d5",
    },
    background: {
      default: "#f5f5f5",
      paper: "#dbdeea",
    },
  },
  typography: {
    fontFamily: `"Inter", "Open Sans", "Roboto", sans-serif`,
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h1: {
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      defaultProps: {
        slotProps: {
          backdrop: {
            sx: {
              opacity: "0.8 !important",
            },
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
