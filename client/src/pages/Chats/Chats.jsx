import { Send } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AIMessages from "../../components/AIMessages";
import { userRequest } from "../../requestMethods";
import { InfoContext } from "../../utils/InfoProvider";
import AssistantCard from "./components/AssistantCard";

export default function Chats() {
  const { setStatus } = useContext(InfoContext);
  const { assistantId } = useParams();
  const [chatLog, setChatLog] = useState([]);
  const [assistant, setAssistant] = useState({});
  const [prompt, setPrompt] = useState("");
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [topP, setTopP] = useState(null);
  const [frequencyPenalty, setFrequencyPenalty] = useState(null);
  const [presencePenalty, setPresencePenalty] = useState(null);
  const [bestOf, setBestOf] = useState(null);

  const data = {
    prompt: prompt,
    temperature: temperature,
    maxLength: maxLength,
    topP: topP,
    frequencyPenalty: frequencyPenalty,
    presencePenalty: presencePenalty,
    bestOf: bestOf,
  };

  useEffect(() => {
    const getChatLog = async () => {
      try {
        const res = await userRequest.get(
          `/assistants?assistantId=${assistantId}`
        );
        setAssistant(res.data);
        setPrompt(res.data.prompt);
        setChatLog(res.data.chatLog);
        setTemperature(res.data.temperature);
        setMaxLength(res.data.maxToken);
        setTopP(res.data.topP);
        setFrequencyPenalty(res.data.frequencyPenalty);
        setPresencePenalty(res.data.presencePenalty);
        setBestOf(res.data.bestOf);
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

    e.preventDefault();
    userRequest
      .post("assistants/messages/ai", {
        assistantId: assistantId,
        data: data,
        message: messages,
        chatLog: chatLogNew,
      })
      .then((res) => {
        console.log(res.data);
        setChatLog([
          ...chatLogNew,
          { user: "gpt", message: `${res.data.message}` },
        ]);
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
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
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg">
        <Grid container display="flex">
          <Grid item xs={8} position="relative">
            <Box component={Paper} height="90vh" width={768} position="fixed">
              <Box height="90vh" sx={{ overflowY: "auto" }}>
                {chatLog.map((message, index) => (
                  <div>
                    <AIMessages
                      avatar={assistant.avatar}
                      message={message}
                      key={index}
                    />
                  </div>
                ))}
                <Toolbar />
                <Toolbar />
              </Box>
              <Box
                position="absolute"
                width="100%"
                sx={{ display: "flex", bottom: 0, left: 0, right: 0 }}
              >
                <Container sx={{ mb: 2 }}>
                  <Paper
                    component="form"
                    elevation={5}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                      alignItems: "center",
                      display: "flex",
                      borderRadius: 1,
                      width: "100%",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, p: "7px" }}
                      placeholder="What's on your mind?"
                      inputProps={{ "aria-label": "what's on your mind" }}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ p: "10px" }}
                      aria-label="send"
                      onClick={handleSubmit}
                    >
                      <Send fontSize="inherit" />
                    </IconButton>
                  </Paper>
                </Container>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AssistantCard
                assistant={assistant}
                temperature={temperature}
                setTemperature={setTemperature}
                maxLength={maxLength}
                setMaxLength={setMaxLength}
                topP={topP}
                setTopP={setTopP}
                frequencyPenalty={frequencyPenalty}
                setFrequencyPenalty={setFrequencyPenalty}
                presencePenalty={presencePenalty}
                setPresencePenalty={setPresencePenalty}
                bestOf={bestOf}
                setBestOf={setBestOf}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
