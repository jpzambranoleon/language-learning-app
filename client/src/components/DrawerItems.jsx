import {
  Assignment,
  Assistant,
  BarChart,
  Cancel,
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";

const DrawerItems = () => {
  const { currentUser } = useSelector((state) => state.user);
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
      try {
        const res = await userRequest.get(`/users/search?q=${search}`);
        setUsers(res.data);
        console.log(users);
      } catch (err) {
        console.log(err);
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
        <Box width={350}>
          <Typography p="10px 0px 10px 20px" variant="h5" fontWeight={500}>
            Search
          </Typography>
          <Box p="10px 20px 15px 20px">
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
                sx={{ ml: 1, flex: 1, p: "5px" }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <IconButton size="small" sx={{ mr: "5px" }} aria-label="send">
                <Cancel fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box height="79vh" sx={{ overflowY: "auto" }}>
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
        </Box>
      </Popover>
      <ListItemButton component={Link} to="/messages">
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={`/profile/${currentUser.username}/posts`}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Fragment>
  );
};

export default DrawerItems;
