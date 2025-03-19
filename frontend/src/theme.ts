import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  // palette: {
  //   mode: "light",
  //   primary: {
  //     main: "#1b1b1b",
  //   },
  //   secondary: {
  //     main: "#0065d5",
  //   },
  //   background: {
  //     default: "#f5f5f5",
  //     paper: "#dbdeea",
  //   },
  // },
  typography: {
    fontFamily: `var(--font-family)`,
    h6: {
      fontSize: "clamp(1rem, .8rem + .5vw, 1.1rem)",
      fontWeight: 600,
    },
    h5: {
      fontSize: "clamp(1.2rem, 1rem + .5vw, 1rem)",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "clamp(1.875rem, 1.3rem + 2.5vw, 1.3rem)",
      fontWeight: 600,
    },
    h2: {
      fontSize: "clamp(2.5rem, 2rem + 2.5vw, 2rem)",
      // fontFamily: "var(--cta-font-family)",
      fontWeight: 600,
    },
    h1: {
      fontSize: "clamp(3.2rem, 0.6rem + 8.25vw, 8.5rem)",
      fontFamily: "var(--cta-font-family)",
      fontWeight: 600,
    },
    body1: {
      fontSize: "clamp(1rem, .8rem + .5vw, 1.375rem)",
      fontWeight: 400,
    },
    body2: {
      fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
      fontWeight: 400,
    },
    subtitle2: {
      color: "var(--secondary-font-color)",
      fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
      fontWeight: 500,
    },
  },
  // components: {
  //   MuiModal: {
  //     styleOverrides: {
  //       root: {
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       },
  //     },
  //     defaultProps: {
  //       slotProps: {
  //         backdrop: {
  //           sx: {
  //             opacity: "0.8 !important",
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
};

export const theme = createTheme(themeOptions);
