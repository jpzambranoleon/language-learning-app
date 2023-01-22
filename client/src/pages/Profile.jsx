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
  Link,
  List,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

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
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                sx={{ height: 140, width: 140 }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h5">
                jpzl_12
              </Typography>
              <Button variant="contained" sx={{ ml: 2 }}>
                Edit profile
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" fontSize="15px">
                <b>Jean-Paul Zambrano-Leon</b>
              </Typography>
              <Typography variant="body2" fontSize="15px">
                Il momento e adesso.
              </Typography>
              <Typography variant="body2" fontSize="15px">
                This is my bio. I like reading, playing soccer, and watching
                movies with my friends.
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
