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
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InfoContext } from "../utils/InfoProvider";

export default function VerifyEmail() {
  const { setStatus } = useContext(InfoContext);
  let { username } = useParams();
  let { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    axios
      .post("/auth/verify/email/token", { username, token })
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        if (res.data.message === "Account activated") {
          setIsValidToken(true);
        }
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  }, [setStatus, username, token]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isValidToken === true ? (
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
          <Typography
            component="h1"
            variant="h4"
            fontWeight="26px"
            gutterBottom
          >
            Email was verified
          </Typography>
          <Typography>Your account is now activated</Typography>
          <Button type="submit" sx={{ mt: 3, mb: 2 }}>
            Continue to login page
          </Button>
        </Box>
      ) : (
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
          <Typography
            component="h1"
            variant="h4"
            fontWeight="26px"
            gutterBottom
          >
            An error occured
          </Typography>
          <Typography>Verification token is invalid or has expired</Typography>
          <Button onClick={handleClick} sx={{ mt: 3, mb: 2 }}>
            Continue to login page
          </Button>
        </Box>
      )}
    </Container>
  );
}
