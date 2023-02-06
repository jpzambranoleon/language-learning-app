import {
  Avatar,
  Box,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const AIMessages = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {message.user === "me" ? (
        <Box sx={{ bgcolor: grey[300] }}>
          <Container maxWidth="md" sx={{ display: "flex" }}>
            <Box sx={{ my: 3, display: "flex" }}>
              <Avatar
                alt={currentUser.name}
                src={currentUser.profilePic}
                sx={{ width: 32, height: 32 }}
              />
              <Typography sx={{ ml: 3 }}>{message.message}</Typography>
            </Box>
          </Container>
        </Box>
      ) : (
        <Box sx={{ bgcolor: "background.paper" }}>
          <Container maxWidth="md" sx={{ display: "flex" }}>
            <Box sx={{ my: 3, display: "flex" }}>
              <Avatar
                alt="Grace Augustine"
                src="https://material-ui.com/static/images/avatar/3.jpg"
                sx={{ width: 32, height: 32 }}
              />
              <Typography sx={{ ml: 3 }}>{message.message}</Typography>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default AIMessages;
