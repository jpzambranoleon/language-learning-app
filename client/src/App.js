import { Send } from "@mui/icons-material";
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  InputBase,
  List,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Message from "./components/Message";
import Navbar from "./Navbar";
// import Chatbot from "./pages/Chatbot";

const mdTheme = createTheme();

function App() {
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const [chatLog, setChatLog] = useState([]);

  // clear chats
  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

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
            sx={{
              height: { xs: "77vh" },
              overflow: "auto",
              display: { xl: "none", xs: "block" },
            }}
          >
            <List>
              {chatLog.map((message, index) => (
                <div ref={scrollRef}>
                  <Message message={message} key={index} />
                </div>
              ))}
            </List>
          </Box>
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
