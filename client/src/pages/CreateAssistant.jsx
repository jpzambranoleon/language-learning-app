import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateAssistant() {
  const { currentUser } = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");

  const steps = [
    {
      label: "Select campaign settings",
      content: (
        <>
          <Typography gutterBottom>
            You can assign your personal assisant a name.
          </Typography>
          <Typography>Name</Typography>
          <TextField
            size="small"
            defaultValue={name}
            multiline
            rows={1}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </>
      ),
    },
    {
      label: "Create an ad group",
      content: (
        <>
          <Typography gutterBottom>
            You can personalize your assisant even further. Why not give it a
            face to go with the name?
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ height: 56, width: 56 }} />
            <Box>
              <Button variant="contained" size="small">
                Upload
              </Button>
              <Button variant="contained" size="small">
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      ),
    },
    {
      label: "Create an ad",
      content: `Try out different ad text to see what brings in the most customers,
                      and learn how to enhance your ads using features like ad extensions.
                      If you run into any problems with your ads, find out how to tell if
                      they're running and how to resolve approval issues.`,
    },
    {
      label: "Create an ad",
      content: `Try out different ad text to see what brings in the most customers,
                      and learn how to enhance your ads using features like ad extensions.
                      If you run into any problems with your ads, find out how to tell if
                      they're running and how to resolve approval issues.`,
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
        position: "relative",
      }}
    >
      <Toolbar />
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={7}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
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
                          onClick={handleNext}
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
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
          <Grid item xs={5}>
            <Card
              sx={{
                height: 535,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ height: 140, width: 140 }} />
              </CardContent>
              <CardContent>
                <Typography textAlign="center" variant="h5">
                  {name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  sx={{
                    wordWrap: "break-word",
                    overflowY: "auto",
                    height: "110px",
                  }}
                >
                  llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
                </Typography>
              </CardContent>
              <Divider />
              <CardContent
                sx={{
                  flexGrow: 1,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <Stack
                  direction="row"
                  spacing={0}
                  sx={{ flexWrap: "wrap", gap: 1 }}
                >
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
