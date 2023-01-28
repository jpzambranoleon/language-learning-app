import {
  Assignment,
  BarChart,
  Chat,
  Dashboard,
  Home,
  Layers,
  Logout,
  People,
  Person,
  Search,
  Send,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";

const DrawerItems = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setUsers([]);
  };

  useEffect(() => {
    const searchUsers = async () => {
      if (search !== "") {
        try {
          const res = await userRequest.get(`/users/search?q=${search}`);
          setUsers(res.data);
          console.log(users);
        } catch (err) {
          console.log(err);
        }
      } else {
        setUsers([]);
      }
    };
    searchUsers();
  }, [search]);

  console.log(users);

  return (
    <Fragment>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Typography p="20px 12px 15px 20px">Search</Typography>
        <Box p="20px 20px 15px 20px" width={400}>
          <Box
            component="form"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              alignItems: "center",
              display: "flex",
              borderRadius: 1,
              width: "100%",
            }}
          >
            <InputBase
              onKeyDown={(e) => e.stopPropagation()}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              size="small"
              sx={{ p: "10px" }}
              aria-label="send"
            >
              <Send fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box height="585px" sx={{ overflowY: "auto" }}>
          <List>
            {users.map((u) => (
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    src={!u.profilePic ? "/broken-image.jpg" : u.profilePic}
                  />
                </ListItemIcon>
                <ListItemText primary={u.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Popover>
      {/* <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem disabled>
          <Typography color={"black"}>Search</Typography>
        </MenuItem>
        <Box p="20px 12px 15px 12px" width={400}>
          <Box
            component="form"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              alignItems: "center",
              display: "flex",
              borderRadius: 1,
              width: "100%",
            }}
          >
            <InputBase
              onKeyDown={(e) => e.stopPropagation()}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              size="small"
              sx={{ p: "10px" }}
              aria-label="send"
            >
              <Send fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box height="500px">
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="text" />
            </ListItemButton>
            {/* {users.map((u) => (
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    src={!u.profilePic ? "/broken-image.jpg" : u.profilePic}
                  />
                </ListItemIcon>
                <ListItemText primary={u.name} />
              </ListItemButton>
           ))} 
          </List>
        </Box>
            </Menu> */}

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
    </Fragment>
  );
};

export default DrawerItems;
