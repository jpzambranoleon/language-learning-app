import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AIConversation from "../components/AIConversation";
import AIMessages from "../components/AIMessages";
import { userRequest } from "../requestMethods";

export default function Assistant() {
  const { currentUser } = useSelector((state) => state.user);
  const [chatLog, setChatLog] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [input, setInput] = useState("");
  const { assistantId } = useParams();

  useEffect(() => {
    const getChatLog = async () => {
      try {
        const res = await userRequest.get(
          `/assistants?assistantId=${assistantId}`
        );
        setPrompt(res.data.prompt);
        setChatLog(res.data.chatLog);
      } catch (err) {
        console.log(err);
      }
    };
    getChatLog();
  }, [assistantId]);

  const handleSubmit = async (e) => {
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    /*
    try {
      const userRes = await userRequest.post(
        "/assistants/messages",
        userMessage
      );
      setMessages([...messages, userRes.data]);
      setInput("");
      const chatLog = messages.map((message) => message.text).join("\n");
      console.log(chatLog);

      const assistantRes = await userRequest.post("/assistants/messages/ai", {
        sender: assistant._id,
        chatLog: chatLog,
        text: `\nHuman: ${newMessage}`,
        conversationId: currentChat._id,
      });

      console.log(assistantRes.data);
    } catch (err) {
      console.log(err);
    } */

    const response = await fetch(
      "http://localhost:5000/api/assistants/messages/ai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId,
          prompt: prompt,
          chatLog: chatLogNew,
          message: messages,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  };

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
        position: "relative",
      }}
    >
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        {chatLog.map((message, index) => (
          <div>
            <AIMessages message={message} key={index} />
          </div>
        ))}
        <Toolbar />
        <Toolbar />
        <Toolbar />
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: `0px 15px 15px 30px ${grey[100]}`,
        }}
      >
        <Container maxWidth="md" sx={{ my: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
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
              aria-label="send"
              onClick={handleSubmit}
            >
              <Send />
            </IconButton>
          </Paper>
          <Typography variant="body2" sx={{ fontSize: "12px", mt: 1 }}>
            ChatGPT Jan 30 Version. Free Research Preview. Our goal is to make
            AI systems more natural and safe to interact with. Your feedback
            will help us improve.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
