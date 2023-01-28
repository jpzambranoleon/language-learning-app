import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuiDrawer from "./components/MuiDrawer";
import Account from "./pages/Account";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SendEmail from "./pages/SendEmail";
import VerifyEmail from "./pages/VerifyEmail";

const mdTheme = createTheme();

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <CssBaseline />
          {currentUser ? (
            <Router>
              <MuiDrawer />
              <Routes>
                <Route path="/" element={<Chatbot />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </Router>
          ) : (
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/send/verification/:email"
                  element={<SendEmail />}
                />
                <Route
                  path="/verify/email/:username/:token"
                  element={<VerifyEmail />}
                />
              </Routes>
            </Router>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
