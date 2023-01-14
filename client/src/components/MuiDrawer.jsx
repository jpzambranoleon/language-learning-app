import * as React from "react";
import { Add, ChevronLeft, Menu, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const MuiDrawer = ({ clearChat }) => {
  const [open, setOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <CustomAppBar
        position="absolute"
        open={open}
        sx={{ display: { lg: "block", xs: "none" } }}
      >
        <Toolbar sx={{ paddingRight: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer
        variant="permanent"
        open={open}
        sx={{ display: { lg: "block", xs: "none" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton onClick={() => clearChat()}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="New Conversation" />
          </ListItemButton>
        </List>
        <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Typography>Logout</Typography>
        </List>
      </CustomDrawer>

      {/* Responsive components for mobile use below */}

      <AppBar sx={{ display: { lg: "none", xs: "block" } }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ marginRight: "36px" }}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Chat Bot
          </Typography>
          <IconButton
            color="inherit"
            aria-label="clear chat"
            onClick={() => clearChat()}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        sx={{ display: { lg: "none", xs: "block" } }}
      >
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <List component="nav">
            <ListItemButton
              onClick={() => {
                clearChat();
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="New Conversation" />
            </ListItemButton>
          </List>
        </ClickAwayListener>
      </Drawer>
    </React.Fragment>
  );
};

export default MuiDrawer;
