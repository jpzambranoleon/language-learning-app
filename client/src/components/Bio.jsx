import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
};

const Bio = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Container maxWidth="xs">
        <Grid container spacing={5} aria-label="name-textfield">
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Avatar />
          </Grid>
          <Grid item xs={10}>
            <Typography>jpzl_12</Typography>
            <Button onClick={handleOpen} size="small" variant="contained">
              Hello
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={5} aria-label="name-textfield">
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <Typography mt={1}>Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField size="small" fullWidth />
            <Typography variant="body2" color="text.secondary" fontSize="12px">
              *This is the name associated with this account
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={5} aria-label="username-textfield">
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <Typography mt={1}>Username</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField size="small" fullWidth />
            <Typography variant="body2" color="text.secondary" fontSize="12px">
              *People will be able to see your username. You can change your
              username here.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={5} aria-label="bio-textfield">
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <Typography>Bio</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField size="small" multiline rows={2} fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={5} aria-label="email-textfield">
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <Typography mt={1}>Email</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField size="small" fullWidth />
            <Button size="small" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ mt: 2, mb: 2, width: 60, height: 60 }} />
          </Box>
          <Typography
            textAlign="center"
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mb: 2, fontSize: "20px" }}
          >
            Profile photo
          </Typography>
          <Divider />
          <ListItemButton>
            <ListItemText>
              <Typography textAlign="center" color={blue[600]} fontWeight="500">
                Upload Photo
              </Typography>
            </ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText>
              <Typography textAlign="center" color={red[600]} fontWeight="500">
                Remove Current Photo
              </Typography>
            </ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={handleClose}
            sx={{
              borderRadius: 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <ListItemText>
              <Typography textAlign="center">Cancel</Typography>
            </ListItemText>
          </ListItemButton>
        </Box>
      </Modal>
    </>
  );
};

export default Bio;
