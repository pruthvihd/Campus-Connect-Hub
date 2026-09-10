import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5",  // Indigo
    },
    secondary: {
      main: "#16a34a",  // Green
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
