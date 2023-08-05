import "./App.css";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import { Router } from "./routes";


const theme = createTheme({
  palette: {
    secondary: {
      main: colors.orange[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
