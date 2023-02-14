import { ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";

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

const DisplayCard = ({ name, model, prompt, file }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={!file ? "/broken-img.jpg" : URL.createObjectURL(file)} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography paragraph variant="body1">
          Name: {name}
        </Typography>
        <Typography paragraph variant="body1">
          Model: {model.model}
        </Typography>
        <Typography paragraph variant="body1">
          Strengths:
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {model.strengths.map((strengths, index) => {
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

export default DisplayCard;
