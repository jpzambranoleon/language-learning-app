import { Dashboard, HomeOutlined, LineAxis, Send } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

const LeftBar = () => {
  return (
    <Stack direction="column" spacing={1} sx={{ m: "50px" }}>
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
  );
};

export default LeftBar;
