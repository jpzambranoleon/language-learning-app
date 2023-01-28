import {
  AddPhotoAlternate,
  EmojiEmotions,
  Phone,
  PhotoAlbum,
  Send,
  VideoCall,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { io } from "socket.io-client";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

export default function Messages() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5500");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        media: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await userRequest.get("/conversations/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMesages = async () => {
      try {
        const res = await userRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMesages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await userRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          //    mb: 4,
        }}
      >
        <Box component={Paper} sx={{ height: "90vh" }}>
          <Grid container>
            <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt={currentUser.name} src={currentUser.profilePic} />
                </ListItemIcon>
                <ListItemText primary={currentUser.name} />
              </ListItemButton>
            </Grid>
            <Grid item xs={9}>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography>Chat</Typography>
                </Box>
                <Box>
                  <IconButton>
                    <Phone />
                  </IconButton>
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                </Box>
              </ListItem>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
              <Grid item xs={12} sx={{ padding: "10px" }}>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Box sx={{ height: "545px", overflowY: "auto" }}>
                <List>
                  {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversation
                        conversation={c}
                        currentUser={currentUser}
                      />
                    </div>
                  ))}

                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Grace Augustine"
                        src="https://material-ui.com/static/images/avatar/3.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Grace" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Sally Withers"
                        src="https://material-ui.com/static/images/avatar/4.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Sally Withers" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Jaime Martinez"
                        src="https://material-ui.com/static/images/avatar/5.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Jaime Martinez" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Shane Smith"
                        src="https://material-ui.com/static/images/avatar/6.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Shane Smith" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="June Liu"
                        src="https://material-ui.com/static/images/avatar/7.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="June Liu" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Jack Sparrow"
                        src="https://material-ui.com/static/images/avatar/7.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Jack Sparrow" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Johnny Depp"
                        src="https://material-ui.com/static/images/avatar/7.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Johhny Depp" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Robert DeNiro"
                        src="https://material-ui.com/static/images/avatar/2.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Shane Smith" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Grace Augustine"
                        src="https://material-ui.com/static/images/avatar/3.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Grace" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Sally Withers"
                        src="https://material-ui.com/static/images/avatar/4.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Sally Withers" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Jaime Martinez"
                        src="https://material-ui.com/static/images/avatar/5.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Jaime Martinez" />
                  </ListItemButton>
                </List>
              </Box>
            </Grid>
            <Grid item xs={9} sx={{ position: "relative" }}>
              {currentChat ? (
                <Box sx={{ height: "553px", overflowY: "auto" }}>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === currentUser._id}
                        currentUser={currentUser}
                        currentChat={currentChat}
                      />
                    </div>
                  ))}
                </Box>
              ) : (
                <Box sx={{ height: "553px", overflowY: "auto" }}>
                  <ListItem>
                    <Grid container justifyContent="flex-end">
                      <Grid
                        item
                        sx={{
                          maxWidth: { lg: 380, xs: 200 },
                          backgroundColor: green[100],
                          borderRadius: 3,
                        }}
                      >
                        <ListItemText
                          sx={{ pl: 2, pr: 2 }}
                          primary="Hello dkaskjdfhlaksjdhf asldkfjhas dkfjahsd fkjashdkl fajsdhklf asjdhflkas dhflkasjd fhaklsdfjh aslkdfj ahskldf askldfhjaskl dfhaksl dfhalsk dfjha slkdf ahsldkfjhaslkdf haslkd fhalksdf haskldjf halskdjf halksdf haklsdjfh alksdf h"
                        />
                      </Grid>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                        sx={{ ml: 1, width: 25, height: 25 }}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justifyContent="flex-end">
                      <Grid item sx={{ maxWidth: { lg: 380, xs: 200 } }}>
                        <CardMedia
                          sx={{ borderRadius: 3 }}
                          component="img"
                          src="https://firebasestorage.googleapis.com/v0/b/chat-a462e.appspot.com/o/1674766924962halo_minecraft.jpg?alt=media&token=867fe5cb-26f2-43fb-99e7-79eb33c6335f"
                        />
                      </Grid>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                        sx={{ ml: 1, width: 25, height: 25 }}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justifyContent="flex-start">
                      <Avatar
                        alt="AI Bot"
                        src="https://material-ui.com/static/images/avatar/3.jpg"
                        sx={{ mr: 1, width: 25, height: 25 }}
                      />
                      <Grid
                        item
                        sx={{
                          maxWidth: { lg: 380, xs: 215 },
                          backgroundColor: blue[100],
                          borderRadius: 3,
                        }}
                      >
                        <ListItemText
                          sx={{ pl: 2, pr: 2 }}
                          primary="Hiya, how are you? askdfjasldkjf askdflaj;skdfj as;ldfkjas dfl;ajsd fa;lsdfkj asdlfkja sd;flkajsd; flaksjd;f laksdjf;a sldkfja s;ldfk asjl;dfa jsd;lfj asdl;fjas;ldf ja;lsdf jal;sd fja;lsdf jskjdfl;asj fl;askjdfla sjd;flaks jdf;laskdjf a;lsdkfja s;ldkfja;sldfk jas;ldfjkas dfs ahksjhas flkasjhdfkla shdklfajshd faklsdfjhaksldfj haklsdfjhaskld fhlkasdhfaskld fhlk sakjdsh aKSJHKASLDFJH ksjdhfa skdjfhaksdjhfa sldkfjhaslkdfjhas kdfjhaslkd fhaklsdjfha ksdfjhaksldj fhaksdjhfkla sdhflaksd fhalksdh flksldjhfaksjd hfklasjdhfklajsdh fkasjdhfkalsdjhfkalsjd fhklasjdhflaksdjhfak sldjhflkasdjfh "
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justifyContent="flex-end">
                      <Grid
                        item
                        sx={{
                          maxWidth: { lg: 380, xs: 200 },
                          backgroundColor: green[100],
                          borderRadius: 3,
                        }}
                      >
                        <ListItemText
                          sx={{ pl: 2, pr: 2 }}
                          primary="Hello dkaskjdfhlaaskldfhjaskl dfhaksl dfhalsk dfjha slkdf ahsldkfjhaslkdf haslkd fhalksdf haskldjf halskdjf halksdf haklsdjfh alksdf h"
                        />
                      </Grid>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                        sx={{ ml: 1, width: 25, height: 25 }}
                      />
                    </Grid>
                  </ListItem>
                </Box>
              )}

              <Box
                position="absolute"
                sx={{ width: "100%", bottom: 0, left: 0, right: 0 }}
              >
                <Divider />
                <Box sx={{ display: "flex", margin: "12px" }}>
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="send"
                  >
                    <EmojiEmotions fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    sx={{ p: "10px", mr: "8px" }}
                    aria-label="send"
                  >
                    <AddPhotoAlternate fontSize="inherit" />
                  </IconButton>
                  <Box
                    component="form"
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
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="What's on your mind?"
                      inputProps={{ "aria-label": "what's on your mind" }}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
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
                  </Box>
                </Box>
              </Box>

              {/* <Box
              sx={{
                alignItems: "center",
                display: "flex",
                width: "100%",
                position: "absolute",
                border: 1,
                bottom: 0,
                left: 0,
                right: 0,
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
                size="small"
                sx={{ p: "10px" }}
                aria-label="send"
              >
                <Send fontSize="inherit" />
              </IconButton>
            </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
