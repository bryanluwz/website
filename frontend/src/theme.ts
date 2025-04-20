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
    allVariants: {
      transition: "color 0.3s ease, font-size 0.3s ease",
    },
    h6: {
      fontSize: "clamp(1rem, .8rem + .5vw, 1.1rem)",
      fontWeight: 600,
    },
    h5: {
      fontSize: "clamp(1rem, 1rem + .5vw, 1.2rem)",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "clamp(1.8rem, 1.8rem + 2.5vw, 2rem)",
      fontWeight: 600,
    },
    h2: {
      fontSize: "clamp(2rem, 2rem + 2.5vw, 2.2rem)",
      fontWeight: 600,
    },
    h1: {
      fontSize: "clamp(4rem, 0.6rem + 8.25vw, 8.5rem)",
      fontFamily: "var(--cta-font-family)",
      fontWeight: 800,
    },
    body1: {
      fontSize: "clamp(0.8rem, .8rem + .5vw, 1.2rem)",
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
    caption: {
      fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
      fontWeight: 400,
    },
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        colorPrimary: {
          color: "var(--primary-font-color)",
        },
        colorSecondary: {
          color: "var(--secondary-font-color)",
        },
      },
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
