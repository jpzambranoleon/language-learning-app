const Assistant = require("../models/assistant.model");
const { Configuration, OpenAIApi } = require("openai");
const User = require("../models/user.model");

// Create the AI assistant
exports.createAI = async (req, res) => {
  console.log(req.body);
  try {
    const newAssistant = new Assistant(req.body.data);

    console.log(newAssistant);

    await newAssistant.save();

    res.status(200).send({
      success: true,
      message: "Assistant created",
      assistant: newAssistant,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

// Update the AI assistant
exports.updateAI = async (req, res) => {
  console.log(req.body);
  try {
    const updatedAssistant = await Assistant.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.data,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Model settings have been saved",
      assistant: updatedAssistant,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

// Delete the AI assistant
exports.deleteAI = async (req, res) => {
  try {
    let assistant = await Assistant.findById(req.params.id);

    if (!assistant) throw new Error("Assistant does not exist");

    await assistant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Assistant deleted",
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

// Get the AI assistants for the user
exports.getAllUsersAI = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    let assistants = await Assistant.find({ userId: user._id });

    res.status(200).json(assistants);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Get the specific AI assistant
exports.getAI = async (req, res) => {
  const assistantId = req.query.assistantId;
  const assistantName = req.query.assistantName;

  try {
    const assistant = assistantId
      ? await Assistant.findById(assistantId)
      : await Assistant.findOne({ name: assistantName });
    res.status(200).json(assistant);
  } catch (err) {
    res.status(500).json(err);
  }
};

// AI assistant message generation
exports.postAIMessage = async (req, res) => {
  const configuration = new Configuration({
    organization: "org-UmsTiOJ79hIOscV8kXQneBET",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const assistantId = req.body.assistantId;

  const {
    prompt,
    temperature,
    maxLength,
    topP,
    bestOf,
    frequencyPenalty,
    presencePenalty,
  } = req.body.data;

  const message = req.body.message;

  const currentAssistant = await Assistant.findById(assistantId);

  await currentAssistant.updateOne({ $set: { chatLog: req.body.chatLog } });

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}${message}.`,
      temperature: temperature,
      max_tokens: maxLength,
      top_p: topP,
      best_of: bestOf,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      stop: [" Human:", " AI:"],
    });
    console.log(message);
    console.log(response.data);
    if (response.data.choices[0].text) {
      await currentAssistant.updateOne({
        $push: {
          chatLog: { user: "gpt", message: response.data.choices[0].text },
        },
      });
      res.json({ message: response.data.choices[0].text });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
