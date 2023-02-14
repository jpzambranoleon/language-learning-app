import { ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
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
  OutlinedInput,
  Slider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { updateAssistant } from "../../../redux/apiCalls";
import { InfoContext } from "../../../utils/InfoProvider";

const Input = styled(OutlinedInput)(({ theme }) => ({
  height: "25px",
  width: "65px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

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

const AssistantCard = ({
  assistant,
  temperature,
  setTemperature,
  maxLength,
  setMaxLength,
  topP,
  setTopP,
  frequencyPenalty,
  setFrequencyPenalty,
  presencePenalty,
  setPresencePenalty,
  bestOf,
  setBestOf,
}) => {
  const { setStatus } = useContext(InfoContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [expanded, setExpanded] = useState(false);

  const data = {
    name: assistant.name,
    prompt: assistant.prompt,
    temperature: temperature,
    maxToken: maxLength,
    topP: topP,
    frequencyPenalty: frequencyPenalty,
    presencePenalty: presencePenalty,
    bestOf: bestOf,
  };

  console.log(data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Temperature slider and input
  const handleTempSliderChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleTempInputChange = (event) => {
    setTemperature(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleTempBlur = () => {
    if (temperature < 0) {
      setTemperature(0);
    } else if (temperature > 1) {
      setTemperature(1);
    }
  };

  // Maximum length slider and input
  const handleMaxLengthSliderChange = (event, newValue) => {
    setMaxLength(newValue);
  };

  const handleMaxLengthInputChange = (event) => {
    setMaxLength(
      event.target.value === "" ? "" : Number(Math.round(event.target.value))
    );
  };

  const handleMaxLengthBlur = () => {
    if (maxLength < 1) {
      setMaxLength(1);
    } else if (maxLength > 4000) setMaxLength(4000);
  };

  // Top P slider and input
  const handleTopPSliderChange = (event, newValue) => {
    setTopP(newValue);
  };

  const handleTopPInputChange = (event) => {
    setTopP(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleTopPBlur = () => {
    if (topP < 0) {
      setTopP(0);
    } else if (topP > 1) {
      setTopP(1);
    }
  };

  // Frequency Penalty slider and input
  const handleFrequencyPenaltySliderChange = (event, newValue) => {
    setFrequencyPenalty(newValue);
  };

  const handleFrequencyPenaltyInputChange = (event) => {
    setFrequencyPenalty(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleFrequencyPenaltyBlur = () => {
    if (frequencyPenalty < 0) {
      setFrequencyPenalty(0);
    } else if (frequencyPenalty > 2) {
      setFrequencyPenalty(2);
    }
  };

  // Presence Penalty slider and input
  const handlePresencePenaltySliderChange = (event, newValue) => {
    setPresencePenalty(newValue);
  };

  const handlePresencePenaltyInputChange = (event) => {
    setPresencePenalty(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handlePresencePenaltyBlur = () => {
    if (presencePenalty < 0) {
      setPresencePenalty(0);
    } else if (presencePenalty > 2) {
      setPresencePenalty(2);
    }
  };

  // Best of slider and input
  const handleBestOfSliderChange = (event, newValue) => {
    setBestOf(newValue);
  };

  const handleBestOfInputChange = (event) => {
    setBestOf(
      event.target.value === "" ? "" : Number(Math.round(event.target.value))
    );
  };

  const handleBestOfBlur = () => {
    if (bestOf < 1) {
      setBestOf(1);
    } else if (bestOf > 20) {
      setBestOf(20);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateAssistant(assistant._id, data, setStatus);
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={<Avatar src={assistant.avatar} />}
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={assistant.name}
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
        <MenuItem onClick={handleSave}>
          <Typography>Save</Typography>
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography paragraph variant="body1">
          Name: {assistant.name}
        </Typography>
        <Typography paragraph variant="body1">
          Model: {assistant.model}
        </Typography>
        <Typography paragraph variant="body1">
          Strengths:
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {assistant.strengths?.map((strengths, index) => {
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
            {assistant.prompt}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Temperature
              </Typography>
            </Box>
            <Box>
              <Input
                value={temperature}
                size="small"
                onChange={handleTempInputChange}
                onBlur={handleTempBlur}
                inputProps={{
                  step: 0.01,
                  min: 0,
                  max: 1,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={typeof temperature === "number" ? temperature : 0}
                onChange={handleTempSliderChange}
                step={0.01}
                min={0}
                max={1}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Maximum Length
              </Typography>
            </Box>
            <Box>
              <Input
                value={maxLength}
                size="small"
                onChange={handleMaxLengthInputChange}
                onBlur={handleMaxLengthBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 4000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={typeof maxLength === "number" ? maxLength : 0}
                onChange={handleMaxLengthSliderChange}
                step={1}
                min={1}
                max={4000}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Top P
              </Typography>
            </Box>
            <Box>
              <Input
                value={topP}
                size="small"
                onChange={handleTopPInputChange}
                onBlur={handleTopPBlur}
                inputProps={{
                  step: 0.01,
                  min: 0,
                  max: 1,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={typeof topP === "number" ? topP : 0}
                onChange={handleTopPSliderChange}
                step={0.01}
                min={0}
                max={1}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Frequency Penalty
              </Typography>
            </Box>
            <Box>
              <Input
                value={frequencyPenalty}
                size="small"
                onChange={handleFrequencyPenaltyInputChange}
                onBlur={handleFrequencyPenaltyBlur}
                inputProps={{
                  step: 0.01,
                  min: 0,
                  max: 2,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={
                  typeof frequencyPenalty === "number" ? frequencyPenalty : 0
                }
                onChange={handleFrequencyPenaltySliderChange}
                step={0.01}
                min={0}
                max={2}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Presence Penalty
              </Typography>
            </Box>
            <Box>
              <Input
                value={presencePenalty}
                size="small"
                onChange={handlePresencePenaltyInputChange}
                onBlur={handlePresencePenaltyBlur}
                inputProps={{
                  step: 0.01,
                  min: 0,
                  max: 2,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={
                  typeof presencePenalty === "number" ? presencePenalty : 0
                }
                onChange={handlePresencePenaltySliderChange}
                step={0.01}
                min={0}
                max={2}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography id="input-slider" gutterBottom>
                Best of
              </Typography>
            </Box>
            <Box>
              <Input
                value={bestOf}
                size="small"
                onChange={handleBestOfInputChange}
                onBlur={handleBestOfBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 20,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                size="small"
                value={typeof bestOf === "number" ? bestOf : 0}
                onChange={handleBestOfSliderChange}
                step={1}
                min={1}
                max={20}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AssistantCard;
