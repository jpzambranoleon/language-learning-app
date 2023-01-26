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
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { InfoContext } from "../utils/InfoProvider";
import { useDispatch } from "react-redux";
import { updateFailure, updateStart, updateSuccess } from "../redux/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

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
  const { setStatus } = useContext(InfoContext);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    bio: currentUser.bio,
    email: currentUser.publicEmail,
    profilePic: currentUser.profilePic,
  });

  console.log(currentUser.profilePic);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    if (file) {
      const fileName = new Date().getTime() + file.name;
      console.log(fileName);
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            formData.profilePic = downloadURL;

            dispatch(updateStart());
            userRequest
              .put(`/users/update/${currentUser._id}`, {
                userId: currentUser._id,
                data: formData,
              })
              .then((res) => {
                setStatus({
                  open: true,
                  message: res.data.message,
                  severity: "success",
                });
                dispatch(updateSuccess(res.data.user));
              })
              .catch((err) => {
                let message = err.response
                  ? err.response.data.message
                  : err.message;
                setStatus({ open: true, message: message, severity: "error" });
                dispatch(updateFailure());
              });
          });
        }
      );
    } else if (!file) {
      dispatch(updateStart());
      userRequest
        .put(`/users/update/${currentUser._id}`, {
          userId: currentUser._id,
          data: formData,
        })
        .then((res) => {
          setStatus({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          dispatch(updateSuccess(res.data.user));
        })
        .catch((err) => {
          let message = err.response ? err.response.data.message : err.message;
          setStatus({ open: true, message: message, severity: "error" });
          dispatch(updateFailure());
        });
    }
  };

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
            <Avatar
              src={
                !file
                  ? !currentUser.profilePic
                    ? "/broken-img.jpg"
                    : currentUser.profilePic
                  : URL.createObjectURL(file)
              }
            />
          </Grid>
          <Grid item xs={10}>
            <Typography>{currentUser.username}</Typography>
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
            <TextField
              defaultValue={currentUser.name}
              id="name"
              multiline
              rows={1}
              size="small"
              fullWidth
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
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
            <TextField
              defaultValue={currentUser.username}
              id="username"
              multiline
              rows={1}
              size="small"
              fullWidth
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
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
            <TextField
              defaultValue={currentUser.bio}
              id="bio"
              size="small"
              multiline
              rows={2}
              fullWidth
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} aria-label="email-textfield">
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <Typography mt={1}>Email</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              defaultValue={currentUser.email}
              id="email"
              multiline
              rows={1}
              size="small"
              fullWidth
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Button onClick={handleSubmit} size="small" variant="contained">
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
            <Avatar
              src={!file ? !currentUser.profilePic : URL.createObjectURL(file)}
              sx={{ mt: 2, mb: 2, width: 60, height: 60 }}
            />
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
          <ListItemButton component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
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
