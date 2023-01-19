import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";

export default function VerifyEmail() {
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
          Verify your email
        </Typography>
        <Typography>We sent an email to</Typography>
        <Typography>jpzl_10@protonmail.com</Typography>
        <Typography>Click the link inside to get started.</Typography>
        <Button type="submit" sx={{ mt: 3, mb: 2 }}>
          Resend email
        </Button>
      </Box>
    </Container>
  );
}
