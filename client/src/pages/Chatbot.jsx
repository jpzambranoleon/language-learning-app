import { Send } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  List,
  Paper,
  Toolbar,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Message from "../components/Message";
import MuiDrawer from "../components/MuiDrawer";

export default function Chatbot() {
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
    <>
      <MuiDrawer clearChat={clearChat} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          position: "relative",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="md"
          sx={{
            height: { lg: "84vh", xs: "84vh" },
            overflowY: "auto",
            display: { xl: "block", xs: "none" },
          }}
        >
          <List>
            {chatLog.map((message, index) => (
              <div ref={scrollRef}>
                <Message message={message} key={index} />
              </div>
            ))}
          </List>
        </Container>
        <Box
          sx={{
            height: { xs: "84vh" },
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
        <Container
          maxWidth="md"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              margin: "12px",
              p: "2px 4px",
              display: { lg: "flex", xs: "none" },
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="What's on your mind?"
              inputProps={{ "aria-label": "what's on your mind" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSubmit}
            >
              <Send />
            </IconButton>
          </Paper>
        </Container>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              bgcolor: "background.paper",
              display: { lg: "none", xs: "flex" },
              p: "2px 4px",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="What's on your mind?"
              inputProps={{ "aria-label": "what's on your mind" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSubmit}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
