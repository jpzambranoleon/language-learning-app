import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";

export default function EmailVerification() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight="26px" gutterBottom>
          Email was verified
        </Typography>
        <Typography>Your account is now activated</Typography>
        <Button type="submit" sx={{ mt: 3, mb: 2 }}>
          Continue to login page
        </Button>
      </Box>
    </Container>
  );
}
