import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";

const AIConversation = ({ assistantId, profilePic, name }) => {
  return (
    <ListItemButton component={Link} to={`/assistant/${assistantId}/chat`}>
      <ListItemIcon>
        <Avatar
          src={!profilePic ? "/broken-image.jpg" : profilePic}
          sx={{ height: 25, width: 25 }}
        />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

export default AIConversation;
