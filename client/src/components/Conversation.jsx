import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await userRequest.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <ListItemButton>
      <ListItemIcon>
        <Avatar
          src={!user.profilePic ? "/broken-image.jpg" : user.profilePic}
        />
      </ListItemIcon>
      <ListItemText primary={user.name} />
    </ListItemButton>
  );
};

export default Conversation;
