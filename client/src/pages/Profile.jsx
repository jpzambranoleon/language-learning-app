import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userRequest } from "../requestMethods";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

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
      <Toolbar />
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar
                src={!user.profilePic ? "/broken-image.jpg" : user.profilePic}
                sx={{ height: 140, width: 140 }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h5">
                {user.username}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/account"
                sx={{ ml: 2 }}
              >
                Edit profile
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" fontSize="15px">
                <b>{user.name}</b>
              </Typography>
              <Typography
                variant="body2"
                fontSize="15px"
                sx={{ whiteSpace: "pre-line" }}
              >
                {user.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={0} centered>
            <Tab label="Item One" />
          </Tabs>
        </Box>
        <TabPanel value={0} index={0}>
          Item One
        </TabPanel>
      </Container>
    </Box>
  );
}
