import { Send } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Link,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://leonedigitale.com/">
        Leone Digitale
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Navbar() {
  return (
    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <Box
        component="form"
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          p: "2px 4px",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="What's on your mind?"
          inputProps={{ "aria-label": "what's on your mind" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <Send />
        </IconButton>
      </Box>
      <Copyright />
    </Box>
  );
}
