import {
  Bookmark,
  EmojiEmotions,
  Favorite,
  MoreVert,
  Send,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";

export default function Home() {
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
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={7} position="relative">
            <Paper>
              <Box sx={{ display: "flex", p: "12px" }}>
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
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", p: "12px" }}>
                <IconButton size="small">
                  <EmojiEmotions fontSize="inherit" />
                </IconButton>
              </Box>
            </Paper>
            <Box sx={{ overflow: "auto" }}>
              <Card sx={{ mt: 2 }}>
                <CardHeader
                  avatar={<Avatar>R</Avatar>}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVert />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                  <IconButton>
                    <Bookmark />
                  </IconButton>
                </CardActions>
              </Card>
              <Card sx={{ mt: 2 }}>
                <CardHeader
                  avatar={<Avatar>R</Avatar>}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVert />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                  <IconButton>
                    <Bookmark />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={5} position="relative">
            <Box position="fixed">
              <Paper sx={{ width: 355 }}>
                <Typography>Hello There</Typography>
              </Paper>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 355,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
