import { ExpandMore, MoreVert } from "@mui/icons-material";
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
  Stack,
  styled,
  Typography,
} from "@mui/material";
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
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body2" paragraph>
          Your assistant will be displayed in a card like the one on the right.
          Be sure to review your assisant before continuing.
        </Typography>
        <Typography variant="body2" paragraph>
          Each assisant you create will have it's own card. They will show up on
          the assisants tab of your profile.
        </Typography>
        <Typography variant="body2" paragraph>
          If you're happy with your settings, you can finish creating your
          personal assisant by clicking on <b>Finish</b>.
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar
                src={!file ? "/broken-img.jpg" : URL.createObjectURL(file)}
              />
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
      </Grid>
    </Grid>
  );
};

export default DisplayCard;
