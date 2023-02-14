import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAssistant1, createAssistant2 } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";
import { InfoContext } from "../../utils/InfoProvider";
import DisplayCard from "./components/DisplayCard";
import SetAvatar from "./components/SetAvatar";
import SetNameAndModel from "./components/SetNameAndModel";
import SetParameters from "./components/SetParameters";
import SetPrompt from "./components/SetPrompt";

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

const defaultPrompt =
  "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ";

export default function CreateAssistant() {
  const { setStatus } = useContext(InfoContext);
  const { currentUser } = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [model, setModel] = useState(models[0]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(0.9);
  const [maxLength, setMaxLength] = useState(150);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0.6);
  const [bestOf, setBestOf] = useState(1);

  const avatar = "/broken-img.jpg";

  console.log(models[0]);

  useEffect(() => {
    const getAssistants = async () => {
      try {
        const res = await userRequest.get(
          `/assistants/get/all/${currentUser.username}`
        );
        console.log(res.data.length);
        setName(`Assistant${res.data.length + 1}`);
      } catch (err) {
        console.log(err);
      }
    };
    getAssistants();
  }, [currentUser.username]);

  const steps = [
    {
      label: "Assign a name for your assistant",
      content: (
        <SetNameAndModel
          name={name}
          model={model}
          setName={setName}
          setModel={setModel}
        />
      ),
    },
    {
      label: "Create an ad group",
      content: <SetAvatar file={file} setFile={setFile} />,
    },
    {
      label: "Model prompt",
      content: (
        <SetPrompt
          defaultPrompt={defaultPrompt}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      ),
    },
    {
      label: "Model parameters",
      content: (
        <SetParameters
          temperature={temperature}
          maxLength={maxLength}
          topP={topP}
          frequencyPenalty={frequencyPenalty}
          presencePenalty={presencePenalty}
          bestOf={bestOf}
          setTemperature={setTemperature}
          setMaxLength={setMaxLength}
          setTopP={setTopP}
          setFrequencyPenalty={setFrequencyPenalty}
          setPresencePenalty={setPresencePenalty}
          setBestOf={setBestOf}
        />
      ),
    },
    {
      label: "Review your assistant",
      content: (
        <DisplayCard name={name} model={model} prompt={prompt} file={file} />
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      createAssistant1(
        {
          userId: currentUser._id,
          name: name,
          model: model.model,
          strengths: model.strengths,
          avatar: avatar,
          prompt: prompt,
          temperature: temperature,
          maxToken: maxLength,
          topP: topP,
          frequencyPenalty: frequencyPenalty,
          presencePenalty: presencePenalty,
          bestOf: bestOf,
        },
        setLoading,
        setStatus,
        handleNext,
        file
      );
    } else {
      createAssistant2(
        {
          userId: currentUser._id,
          name: name,
          model: model.model,
          strengths: model.strengths,
          avatar: avatar,
          prompt: prompt,
          temperature: temperature,
          maxToken: maxLength,
          topP: topP,
          frequencyPenalty: frequencyPenalty,
          presencePenalty: presencePenalty,
          bestOf: bestOf,
        },
        setLoading,
        setStatus,
        handleNext
      );
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="md">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 4 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box>{step.content}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={
                        index === steps.length - 1 ? handleSubmit : handleNext
                      }
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            {loading ? (
              <LinearProgress />
            ) : (
              <>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  );
}
