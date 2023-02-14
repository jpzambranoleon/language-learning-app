import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AICard from "../components/AICard";
import {
  fetchAssistantFailure,
  fetchAssistants,
  fetchAssistantStart,
  fetchAssistantSuccess,
} from "../redux/assistantSlice";
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
  const { username, page } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // const { assistants } = useSelector((state) => state.assistants);
  const [user, setUser] = useState({});
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(assistants);

  const tabNameToIndex = {
    0: "posts",
    1: "assistants",
    posts: 0,
    assistants: 1,
  };

  const [selectedTab, setSelectedTab] = useState(tabNameToIndex[page]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    setLoading(true);
    const getAssistants = async () => {
      try {
        const res = await userRequest.get(
          `/assistants/get/all/${currentUser.username}`
        );
        console.log(res.data);
        setAssistants(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAssistants();
  }, [currentUser.username]);

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
          <Tabs value={selectedTab} onChange={handleChange} centered>
            <Tab
              label="Posts"
              component={Link}
              to={`/profile/${username}/posts`}
            />
            <Tab
              label="Assistants"
              component={Link}
              to={`/profile/${username}/assistants`}
            />
          </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack direction="column" sx={{ flexWrap: "wrap", gap: 1 }}>
              {assistants.map((a) => (
                <div>
                  <AICard
                    modelId={a._id}
                    name={a.name}
                    avatar={a.avatar}
                    model={a.model}
                    strengths={a.strengths}
                    prompt={a.prompt}
                  />
                </div>
              ))}
            </Stack>
          )}
        </TabPanel>
      </Container>
    </Box>
  );
}
