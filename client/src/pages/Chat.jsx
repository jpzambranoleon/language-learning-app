import { Send } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Chat() {
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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ height: "67vh", mb: 2, overflowY: "auto" }}>
          <List>
            <ListItem>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ backgroundColor: grey[100], borderRadius: 3 }}
                >
                  <ListItemText
                    sx={{ pl: 2, pr: 2 }}
                    primary="Hello chatgpt. My name is Jean-Paul Zambrano-Leon and I need assistance. Will you help me? I know that you are way smarter than me."
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
              <Grid container justifyContent="flex-start">
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
                  sx={{ backgroundColor: grey[100], borderRadius: 3 }}
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
          </List>
        </Paper>
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
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
