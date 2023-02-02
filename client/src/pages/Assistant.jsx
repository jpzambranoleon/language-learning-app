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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AIConversation from "../components/AIConversation";
import { userRequest } from "../requestMethods";

export default function Assistant() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    const getAIConversations = async () => {
      try {
        const res = await userRequest.get(
          "/assistants/conversations/get/" + userId
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAIConversations();
  }, [userId]);

  useEffect(() => {
    const getAIMessages = async () => {
      try {
        const res = await userRequest.get(
          "/assistants/messages/get/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAIMessages();
  }, [currentChat]);

  console.log(messages);

  async function handleSubmit(e) {
    e.preventDefault();
    // let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    // setChatLog(chatLogNew);

    const chatLog = messages.map((message) => message.text).join("\n");

    console.log(chatLog);

    //  const response = await userRequest.post("/assistant/chat", {
    //    message: messages,
    //  });

    // const response = await fetch(
    //   "http://localhost:5000/api/assistants/messages/ai",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       message: messages,
    //     }),
    //   }
    // );

    // const data = await response.json();
    // console.log(data);
    // setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    // console.log(chatLog);
  }

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
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <Paper>
              <Typography>Hello</Typography>
              <List>
                {conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <AIConversation
                      AIconversation={c}
                      currentUser={currentUser}
                    />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <ListItem sx={{ bgcolor: "background.paper" }}>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Hello" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Hello there" />
              </ListItem>
              <ListItem sx={{ bgcolor: "background.paper" }}>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="dalfjsdk; asd;lfkajsd f;asdkfja sd;lfkjasd ;lfkajsd;lf aksjdl;fkajs df;aljsdflkasjd f;laskdfja ;sdlfkjas d;flaksjd fdl;afskd jaf;sldkfja sd;lfakjsd f;laskdj f;alsdkjf a;sldfkja s;dflkasjd f;laskdjf ;asldkfjas;dlf kajsd;flak sjdl;fakj sd;lfaks jd;fa dlsfkjd f;asdlkj;ls dfa;lsdkjf a;lsdf jal;dsfj al;sdkfj als;dkfj a;sldfja;sldfkjal;sdfjal;sd fj;alsdk jfa;lsdfjal;sdkfj als;df jas;dlfja;sldkf jal;sdfja;lsdfj as;ldfja;lsdf ja;lsdfkjas;dlf ja;lsdf " />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="d;alkfsjdl fajs;dlfk jasl;dkfjasl;df ja;lsdkjf alskdfja;lsdf ja;lsdkfj al;sdkjfa;ls dkjfa;lsdkjf a;sldkfja;sldkfja;sldkf jals;dkfja l;sdkfja;lsdkfjal;skd fja;lksdjf a;lsdkjfa ;lsdkfja;sldkfja sd;lfkajsd l;fheaif;jseofjwiejfaslkdfhewpi;fjalskdfj aipsehfas;kldjfa seifhasdlkfjas ;dlfhewipfajsk;dflasdihfpasdfjkas; jdfalsdkjfa ;sdlkfja sdfjasd;lkfjas dlfkjas;ldkfjas dlfkajsd;f alksdjf;a lsdkfja;sldkf aj;sdlfkaj sd;flaksdjf a;ldsfkjas; dflkas;dfkasjd;flak jsdlfa;ksjdflasdk fja;lsdkfja sld;fkjas dlfkjas;dlf kajsd;lkfaj sdlkfjasdlkfjasd kfjaslkdfjasl;dfkjas; dlfkjasdlkfj asl;dkfjasld kfja ;sldfk" />
              </ListItem>
              <ListItem sx={{ bgcolor: "background.paper" }}>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ wordBreak: "break-all" }}
                  primary="lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ wordBreak: "break-all" }}
                  primary="d;alkfsjdl fajs;dlfk jasl;dkfjasl;df ja;lsdkjf alskdfja;lsdf ja;lsdkfj al;sdkjfa;ls dkjfa;lsdkjf a;sldkfja;sldkfja;sldkf jals;dkfja l;sdkfja;lsdkfjal;skd fja;lksdjf a;lsdkjfa ;lsdkfja;sldkfja sd;lfkajsd l;fheaif;jseofjwiejfaslkdfhewpi;fjalskdfj aipsehfas;kldjfa seifhasdlkfjas ;dlfhewipfajsk;dflasdihfpasdfjkas; jdfalsdkjfa ;sdlkfja sdfjasd;lkfjas dlfkjas;ldkfjas dlfkajsd;f alksdjf;a lsdkfja;sldkf aj;sdlfkaj sd;flaksdjf a;ldsfkjas; dflkas;dfkasjd;flak jsdlfa;ksjdflasdk fja;lsdkfja sld;fkjas dlfkjas;dlf kajsd;lkfaj sdlkfjasdlkfjasd kfjaslkdfjasl;dfkjas; dlfkjasdlkfj asl;dkfjasld kfja ;sldfk llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
                />
              </ListItem>
              <ListItem sx={{ bgcolor: "background.paper" }}>
                <ListItemIcon>
                  <Avatar
                    alt="Grace Augustine"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ wordBreak: "break-all" }}
                  primary="llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
                />
              </ListItem>
            </Box>

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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
