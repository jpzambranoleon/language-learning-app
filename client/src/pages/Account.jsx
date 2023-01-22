import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Account() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Grid container component={Paper}>
          <Grid item xs={3}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
              <Tab label="Item Five" {...a11yProps(4)} />
              <Tab label="Item Six" {...a11yProps(5)} />
              <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <TabPanel value={value} index={0}>
              <Container maxWidth="sm">
                <Grid container>
                  <Grid item xs={3} sx={{ backgroundColor: "red" }}>
                    <Box display="flex" justifyContent="flex-end" mt={1} mr={2}>
                      Name
                    </Box>
                  </Grid>
                  <Grid item xs={8} sx={{ backgroundColor: "yellow" }}>
                    <TextField fullWidth size="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="12px"
                    >
                      *This is the name associated with this account
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} sx={{ backgroundColor: "blue" }}>
                    <Box display="flex" justifyContent="flex-end" mt={1} mr={2}>
                      Username
                    </Box>
                  </Grid>
                  <Grid item xs={8} sx={{ backgroundColor: "brown" }}>
                    <TextField fullWidth size="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="12px"
                    >
                      *People will be able to see your username. You can change
                      your username here.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} sx={{ backgroundColor: "green" }}>
                    <Box display="flex" justifyContent="flex-end" mr={2}>
                      Bio
                    </Box>
                  </Grid>
                  <Grid item xs={8} sx={{ backgroundColor: "cyan" }}>
                    <TextField multiline rows={2} fullWidth size="small" />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} sx={{ backgroundColor: "purple" }}>
                    <Box display="flex" justifyContent="flex-end" mt={1} mr={2}>
                      Email
                    </Box>
                  </Grid>
                  <Grid item xs={8} sx={{ backgroundColor: "pink" }}>
                    <TextField fullWidth size="small" />
                    <Button variant="contained">Submit</Button>
                  </Grid>
                </Grid>
              </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Hello
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
              Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
              Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
              Item Seven
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
