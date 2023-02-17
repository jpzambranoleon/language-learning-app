import { Dashboard, HomeOutlined, LineAxis, Send } from "@mui/icons-material";
import { Avatar, Box, Button, Stack } from "@mui/material";

const LeftBar = () => {
  return (
    <Box sx={{ m: "50px", height: "100vh" }}>
      <Avatar />
      <Stack direction="column" spacing={1}>
        <Button
          startIcon={<HomeOutlined />}
          variant="contained"
          fullWidth
          disableElevation
          sx={{ p: "10px" }}
        >
          Home
        </Button>
        <Button
          startIcon={<Dashboard />}
          variant="contained"
          fullWidth
          disableElevation
        >
          Explore
        </Button>
        <Button
          startIcon={<Send />}
          variant="contained"
          fullWidth
          disableElevation
        >
          Direct
        </Button>
        <Button
          startIcon={<LineAxis />}
          variant="contained"
          fullWidth
          disableElevation
        >
          Stats
        </Button>
      </Stack>
    </Box>
  );
};

export default LeftBar;
