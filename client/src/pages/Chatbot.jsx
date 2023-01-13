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
} from "@mui/material";
import { blue, green } from "@mui/material/colors";

export default function Chatbot() {
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
      <Toolbar sx={{ display: { lg: "block", xs: "none" } }} />
      <Container maxWidth="md" sx={{ height: "84vh", overflowY: "auto" }}>
        <List>
          <ListItem>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: green[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="Hello chatgpt. My name is Jean-Paul Zambrano-Leon and I need assistance. Will you help me? I know that you are way smarter than me. I can speak multiple languages just like you."
                />
              </Grid>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                sx={{ ml: 1, width: 25, height: 25 }}
              />
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary="message created at"
                  sx={{ mr: 4 }}
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-start">
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                sx={{ mr: 1, width: 25, height: 25 }}
              />
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: blue[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="Hello Jean-Paul. I am your artificial inteligence assistant chatgpt."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="left"
                  secondary="message created at"
                  sx={{ ml: 4 }}
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-start">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: blue[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="I am programmed to be your personal assisant. I use the latest natural language processing technology in the market. I can be used to solve complicated problems that can help you learn."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="left"
                  secondary="message created at"
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: green[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="Wow thank you so much chatgpt! I'm definatly going to use you as my assistant and we can solve many problems together. Do you like have a personality too or are you just a robot? I'm scared of robots you know. I'm not going to like you if you are a robot."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary="message created at"
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: green[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="I will do my best to impress you and I will work hard to become successful. So help me God! I will become the next Steve Jobs."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary="message created at"
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: green[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="I will do my best to impress you and I will work hard to become successful. So help me God! I will become the next Steve Jobs."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary="message created at"
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ backgroundColor: green[100], borderRadius: 3 }}
              >
                <ListItemText
                  sx={{ pl: 2, pr: 2 }}
                  primary="I will do my best to impress you and I will work hard to become successful. So help me God! I will become the next Steve Jobs."
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary="message created at"
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Container>
      <Container
        maxWidth="md"
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <Paper
          component="form"
          sx={{
            margin: "12px",
            p: "2px 4px",
            display: "flex",
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
        </Paper>
      </Container>
    </Box>
  );
}
