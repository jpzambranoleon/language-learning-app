import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { Add, Favorite, MoreVert, Search, Share } from "@mui/icons-material";
import { grey, red } from "@mui/material/colors";
import RightBar from "./Rightbar";
import LeftBar from "./Leftbar";

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
      <Grid container>
        <Grid item xs={3} bgcolor="background.paper">
          <LeftBar />
        </Grid>
        <Grid item xs={6}>
          <Box
            component="container"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: "50px",
            }}
          >
            <Box
              component="form"
              bgcolor="background.paper"
              sx={{
                p: "10px 10px",
                display: "flex",
                alignItems: "center",
                width: 310,
                border: 1,
                borderColor: grey[200],
                borderRadius: "20px",
              }}
            >
              <Search />
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
            </Box>
            <Button
              variant="contained"
              disableElevation
              startIcon={<Add />}
              sx={{
                borderRadius: "20px",
                backgroundImage: "linear-gradient(to right, #E040FB, #00BCD4)",
              }}
            >
              Create new post
            </Button>
          </Box>
          <Box sx={{ m: "50px" }}>
            <Typography variant="h5" fontWeight={500}>
              Feeds
            </Typography>
            <Card elevation={0} sx={{ borderRadius: "15px", mb: 2 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <Box sx={{ m: "15px" }}>
                <CardMedia
                  component="img"
                  image="https://firebasestorage.googleapis.com/v0/b/chatbots-416f6.appspot.com/o/360_F_296786762_ucj0pcmqEJPxURshkvm8ufQ7NV6TbArL.jpg?alt=media&token=de5f6fe6-7171-4d48-8072-6f928b7049c1"
                  alt="Paella dish"
                  sx={{ borderRadius: "12px" }}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
            <Card elevation={0} sx={{ borderRadius: "15px", mb: 2 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <Box sx={{ m: "15px" }}>
                <CardMedia
                  component="img"
                  image="https://firebasestorage.googleapis.com/v0/b/chatbots-416f6.appspot.com/o/360_F_296786762_ucj0pcmqEJPxURshkvm8ufQ7NV6TbArL.jpg?alt=media&token=de5f6fe6-7171-4d48-8072-6f928b7049c1"
                  alt="Paella dish"
                  sx={{ borderRadius: "12px" }}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={3} bgcolor="background.paper">
          <RightBar />
        </Grid>
      </Grid>
    </Box>
  );
}
