import {
  Box,
  Grid,
  OutlinedInput,
  Paper,
  Slider,
  styled,
  Typography,
} from "@mui/material";

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

const SetParameters = ({
  temperature,
  maxLength,
  topP,
  frequencyPenalty,
  presencePenalty,
  bestOf,
  setTemperature,
  setMaxLength,
  setTopP,
  setFrequencyPenalty,
  setPresencePenalty,
  setBestOf,
}) => {
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

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom variant="body1" fontWeight={500}>
            Parameters
          </Typography>
          <Typography variant="body2" paragraph>
            These parameters refer to the numerous adjustable values within the
            neural network architecture that enable the model to perform
            language tasks such as text generation, completion, and translation.
          </Typography>
          <Typography variant="body2" paragraph>
            These parameters determine the size, complexity, and capabilities of
            the model, which affects its performance on various language tasks.
          </Typography>
          <Typography variant="body2" paragraph>
            The large number of parameters in GPT-3 allows it to generate
            coherent and contextually appropriate text with remarkable accuracy
            and fluency, making it one of the most powerful language models
            currently available.
          </Typography>
        </Grid>
        <Grid item xs={6} component={Paper} p={3}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default SetParameters;
