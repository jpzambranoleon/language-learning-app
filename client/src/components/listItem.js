import { Add, Chat, Home, Person, Search } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Search />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>
    <ListItemButton component={Link} to="/messages">
      <ListItemIcon>
        <Chat />
      </ListItemIcon>
      <ListItemText primary="Chats" />
    </ListItemButton>
    <ListItemButton component={Link} to="/profile">
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Chat assistants
    </ListSubheader>
    <ListItemButton component={Link} to="/assistant/create">
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Create assistant" />
    </ListItemButton>
  </React.Fragment>
);
