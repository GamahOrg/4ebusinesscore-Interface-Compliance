import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { CircularsConsume } from "@4eplatform/shared/apis/circulars";

// Async Thunk action creator
export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (body: {}, thunkApi) => {
    try {
      const response = await CircularsConsume.createMessage(body);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updateMessage = createAsyncThunk(
  "message/updateMessage",
  async (body: {}, thunkApi) => {
    try {
      const response = await CircularsConsume.updateMessage(body);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (params: {}, thunkApi) => {
    try {
      const response = await CircularsConsume.fetchMessages(params);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchLastMessage = createAsyncThunk(
  "message/fetchLastMessage",
  async (params: {}, thunkApi) => {
    try {
      const response = await CircularsConsume.fetchLastMessage(params);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  lastMessage: null,
  messages: [],
  statuses: {
    createMessageStatus: RequestStatus.idle,
    updateMessageStatus: RequestStatus.idle,
    fetchMessagesStatus: RequestStatus.idle,
    fetchLastMessageStatus: RequestStatus.idle,
  },
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        handlePending(state, "createMessageStatus");
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.statuses.createMessageStatus = RequestStatus.succeeded;
      })
      .addCase(createMessage.rejected, (state, action) => {
        handleRejected(state, action, "createMessageStatus");
      })
      .addCase(updateMessage.pending, (state) => {
        handlePending(state, "updateMessageStatus");
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.statuses.updateMessageStatus = RequestStatus.succeeded;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        handleRejected(state, action, "updateMessageStatus");
      })
      .addCase(fetchMessages.pending, (state) => {
        handlePending(state, "fetchMessagesStatus");
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.statuses.fetchMessagesStatus = RequestStatus.succeeded;
        state.messages = action.payload.result;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        handleRejected(state, action, "fetchMessagesStatus");
      })
      .addCase(fetchLastMessage.pending, (state) => {
        handlePending(state, "fetchLastMessageStatus");
      })
      .addCase(fetchLastMessage.fulfilled, (state, action) => {
        state.statuses.fetchLastMessageStatus = RequestStatus.succeeded;
        state.lastMessage = action.payload.result;
      })
      .addCase(fetchLastMessage.rejected, (state, action) => {
        handleRejected(state, action, "fetchLastMessageStatus");
      });
  },
});

// Handlers
const handlePending = (state: any, statusKey: keyof any["statuses"]) => {
  state.statuses[statusKey] = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (
  state: any,
  action: any,
  statusKey: keyof any["statuses"]
) => {
  state.statuses[statusKey] = RequestStatus.failed;
  state.error = action.error?.message ?? "AnErrorOccurred";
  state.loading = false;
};

export default messageSlice.reducer;
