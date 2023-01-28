import { Avatar, CardMedia, Grid, ListItem, ListItemText } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Message = ({ message, own, currentUser, currentChat }) => {
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const friendId = currentChat.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await userRequest.get(`/users?userId=${friendId}`);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, currentChat]);

  return (
    <>
      {message.text ? (
        own ? (
          <ListItem key={message._id}>
            <Grid container justifyContent="flex-end">
              <Grid
                item
                sx={{
                  maxWidth: { lg: 360, xs: 200 },
                  backgroundColor: green[100],
                  borderRadius: 3,
                }}
              >
                <ListItemText sx={{ pl: 2, pr: 2 }} primary={message.text} />
              </Grid>
              <Avatar
                alt="Remy Sharp"
                src={currentUser.profilePic}
                sx={{ ml: 1, width: 25, height: 25 }}
              />
            </Grid>
          </ListItem>
        ) : (
          <ListItem key={message._id}>
            <Grid container justifyContent="flex-start">
              <Avatar
                alt="friend"
                src={friend.profilePic}
                sx={{ mr: 1, width: 25, height: 25 }}
              />
              <Grid
                item
                sx={{
                  maxWidth: { lg: 360, xs: 215 },
                  backgroundColor: blue[100],
                  borderRadius: 3,
                }}
              >
                <ListItemText sx={{ pl: 2, pr: 2 }} primary={message.text} />
              </Grid>
            </Grid>
          </ListItem>
        )
      ) : own ? (
        <ListItem key={message._id}>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{ maxWidth: { lg: 380, xs: 200 } }}>
              <CardMedia
                sx={{ borderRadius: 3 }}
                component="img"
                src={message.img}
              />
            </Grid>
            <Avatar
              src={currentUser.profilePic}
              sx={{ ml: 1, width: 25, height: 25 }}
            />
          </Grid>
        </ListItem>
      ) : (
        <ListItem key={message._id}>
          <Grid container justifyContent="flex-start">
            <Avatar
              alt="friend"
              src={friend.profilePic}
              sx={{ mr: 1, width: 25, height: 25 }}
            />
            <Grid item sx={{ maxWidth: { lg: 380, xs: 200 } }}>
              <CardMedia
                sx={{ borderRadius: 3 }}
                component="img"
                src={message.img}
              />
            </Grid>
          </Grid>
        </ListItem>
      )}
    </>
  );
};

export default Message;
