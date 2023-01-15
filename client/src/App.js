import { Send } from "@mui/icons-material";
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  InputBase,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
// import Chatbot from "./pages/Chatbot";

const mdTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              p: "2px 4px",
              alignItems: "center",
              position: "absolute",
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="What's on your mind?"
              inputProps={{ "aria-label": "what's on your mind" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
