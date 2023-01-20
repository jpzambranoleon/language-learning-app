import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { InfoContext } from "../utils/InfoProvider";

export default function SendEmail() {
  const { setStatus } = useContext(InfoContext);
  let { email } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/resend/email", { email })
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  };

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
        <Typography>{email}</Typography>
        <Typography>Click the link inside to get started.</Typography>
        <Button onClick={handleSubmit} sx={{ mt: 3, mb: 2 }}>
          Resend email
        </Button>
      </Box>
    </Container>
  );
}
