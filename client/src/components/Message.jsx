import { Avatar, Grid, ListItem, ListItemText } from "@mui/material";
import { blue, green } from "@mui/material/colors";

const Message = ({ message }) => {
  return (
    <>
      {message.user === "me" ? (
        <ListItem>
          <Grid container justifyContent="flex-end">
            <Grid
              item
              sx={{
                maxWidth: 350,
                backgroundColor: green[100],
                borderRadius: 3,
              }}
            >
              <ListItemText sx={{ pl: 2, pr: 2 }} primary={message.message} />
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
      ) : (
        <ListItem>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/3.jpg"
              sx={{ mr: 1, width: 25, height: 25 }}
            />
            <Grid
              item
              sx={{
                maxWidth: 350,
                backgroundColor: blue[100],
                borderRadius: 3,
              }}
            >
              <ListItemText sx={{ pl: 2, pr: 2 }} primary={message.message} />
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
      )}
    </>
  );
};

export default Message;
