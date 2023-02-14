import { async } from "@firebase/util";
import { ChatBubbleOutline, ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { InfoContext } from "../utils/InfoProvider";

const ExpandMoreStyle = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AICard = ({ modelId, name, avatar, model, strengths, prompt }) => {
  const { setStatus } = useContext(InfoContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [expanded, setExpanded] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setAnchorEl(null);

    userRequest
      .delete(`/assistants/delete/${modelId}`)
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDelete}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography paragraph variant="body1">
          Name: {name}
        </Typography>
        <Typography paragraph variant="body1">
          Model: {model}
        </Typography>
        <Typography paragraph variant="body1">
          Strengths:
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {strengths.map((strengths, index) => {
            return (
              <Chip
                key={index}
                label={strengths}
                size="small"
                color="primary"
              />
            );
          })}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="chat"
          component={Link}
          to={`/assistant/${modelId}/chat`}
        >
          <ChatBubbleOutline />
        </IconButton>
        <ExpandMoreStyle
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </ExpandMoreStyle>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Prompt:</Typography>
          <Typography
            paragraph
            variant="body2"
            sx={{ whiteSpace: "pre-line" }}
            color="text.secondary"
          >
            {prompt}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AICard;
