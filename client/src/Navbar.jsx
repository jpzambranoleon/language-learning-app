import { Send } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Link,
  List,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ mt: 2 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://leonedigitale.com/">
        Leone Digitale
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Navbar() {
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
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: { xs: "85vh" },
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
      <Box>
        <Box
          component="form"
          sx={{
            bgcolor: "background.paper",
            display: "flex",
            p: "2px 4px",
            alignItems: "center",
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
        <Copyright />
      </Box>
    </Box>
  );
}
