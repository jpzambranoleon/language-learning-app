import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

export const fetchAssistants = createAsyncThunk(
  "assistant/getAssistants",
  async (username) => {
    try {
      const res = await userRequest.get(`/assistants/get/all/${username}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  assistants: null,
  loading: false,
  error: false,
};

export const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    fetchAssistantStart: (state) => {
      state.loading = true;
    },
    fetchAssistantSuccess: (state, action) => {
      state.loading = false;
      state.assistants = action.payload;
    },
    fetchAssistantFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    [fetchAssistants.fulfilled]: (state, action) => {
      state.assistants.push(action.payload);
    },
  },
});

export const {
  addAssistantStart,
  addAssistantSuccess,
  addAssistantFailure,
  fetchAssistantStart,
  fetchAssistantSuccess,
  fetchAssistantFailure,
} = assistantSlice.actions;

export default assistantSlice.reducer;
