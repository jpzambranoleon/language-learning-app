import {
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const models = [
  {
    model: "text-davinci-003",
    description: `Most capable model in the GPT-3 series. Can perform any task the other GPT-3 models can, often with higher quality, longer output and better instruction-following. It can process up to 4,000 tokens per request.`,
    strengths: [
      "Complex intent",
      "Cause and effect",
      "Summarization for audience",
    ],
  },
  {
    model: "text-curie-001",
    description:
      "Very capable, but faster and lower cost than text-davinci-003.",
    strengths: [
      "Language translation",
      "Complex classification",
      "Text sentiment",
      "Summarization",
    ],
  },
  {
    model: "text-babbage-001",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    strengths: ["Moderate classification", "Semantic search classification"],
  },
  {
    model: "text-ada-001",
    description:
      "Capable of simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    strengths: [
      "Parsing text",
      "Simple classification",
      "Address correction",
      "Keywords",
    ],
  },
  {
    model: "code-davinci-002",
    description:
      "Most capable model in the Codex series, which can understand and generate code, including translating natural language to code. It can process up to 4,000 tokens per request",
    strengths: ["Generate code"],
  },
  {
    model: "code-cushman-001",
    description:
      "Almost as capable as code-davinci-002, but slightly faster. Part of the Codex series, which can understand and generate code.",
    strengths: ["Generate code"],
  },
];

const SetNameAndModel = ({ name, model, setName, setModel }) => {
  console.log(model);
  return (
    <Stack direction="column" spacing={3}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body2" paragraph>
            You can assign a name to your model. Your model is yours to freely
            customize. Giving it a name can help you distinguise this model from
            the rest of your models.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ ml: 2 }}>Name</Typography>
          <TextField
            fullWidth
            size="small"
            defaultValue={name}
            multiline
            rows={1}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ ml: 2 }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom variant="body1" fontWeight={500}>
            {model.model}
          </Typography>
          <Typography variant="body2" paragraph>
            {model.description}
          </Typography>
          <Typography gutterBottom variant="body1" fontWeight={500}>
            Strengths:
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 5 }}>
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
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ ml: 2 }}>Model</Typography>
          <FormControl fullWidth sx={{ ml: 2, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={model}
              defaultValue={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {models?.map((m, index) => {
                return (
                  <MenuItem key={index} value={m}>
                    {m.model}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SetNameAndModel;
