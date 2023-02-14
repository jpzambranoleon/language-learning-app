import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

const SetPrompt = ({ defaultPrompt, prompt, setPrompt }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2" paragraph>
          The prompt refers to the initial text or partial sentence that is
          provided to the model to generate the rest of the text.
        </Typography>
        <Typography variant="body2" paragraph>
          The prompt serves as a context for the language model to generate the
          subsequent text, and it can be as short as a few words or as long as a
          paragraph. The prompt can be formulated in the form of a question, a
          statement, or a combination of both, and it provides the model with a
          starting point to continue generating text that is coherent and
          contextually appropriate.
        </Typography>
        <Typography variant="body2" paragraph>
          The quality of the prompt can significantly influence the quality of
          the generated text, as it helps to guide the model towards generating
          text that is relevant and meaningful.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box component={Paper} p={"12px"}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={10}
            defaultValue={defaultPrompt}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SetPrompt;
