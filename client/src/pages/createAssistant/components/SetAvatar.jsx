import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

const SetAvatar = ({ file, setFile }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography paragraph variant="body2">
          You can personalize your assisant even further. Why not give it a face
          to go with the name?
        </Typography>
        <Box>
          <Button variant="contained" size="small" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
            Upload
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => setFile(null)}
          >
            Cancel
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={!file ? "/broken-image.jpg" : URL.createObjectURL(file)}
            sx={{ height: 150, width: 150 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SetAvatar;
