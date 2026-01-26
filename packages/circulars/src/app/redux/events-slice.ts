import { EventsConsume } from "@4eplatform/shared/apis/events";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { EventModel } from "../model/sectors/events/event-model";
import { SectorModel } from "../model/sectors/add-sector-model";

interface EventsState {
  events: EventModel[];
  event: EventModel;
  sectors: SectorModel[];
  status: RequestStatus;
  eventDetails: any;
  pagination: Pagination;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  event: new EventModel(
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    true,
    0,
    [],
    [],
    ""
  ),
  sectors: [],
  status: RequestStatus.idle,
  eventDetails: null,
  pagination: new Pagination(),
  error: "",
};

export const addEvent = createAsyncThunk<ResponseModel, any>(
  "events/addEvent",
  async (newEvent = {}, thunkApi) => {
    try {
      const response = await EventsConsume.addEvent(newEvent);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
/*------------------------Sectors-------------------------------------*/
export const fetchEventSectors = createAsyncThunk<ResponseModel, any>(
  "events/sectors",
  async (params = {}, thunkApi) => {
    try {
      const response = await EventsConsume.getAllSectors(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
/*--------------------------------------------------------------------*/
export const fetchEventsSettings = createAsyncThunk<ResponseModel, any>(
  "events/fetchEventsSettings",
  async (params = {}, thunkApi) => {
    try {
      const response =
        await EventsConsume.getAllEventsPaginatedFiltered(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchEvent = createAsyncThunk<ResponseModel, any>(
  "events/fetchEvent",
  async (eventId: string, thunkApi) => {
    try {
      const response = await EventsConsume.getEventsDetailsById(eventId);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteEvent = createAsyncThunk<ResponseModel, any>(
  "events/deleteEvent",
  async (eventId: string | number, thunkApi) => {
    try {
      const response = await EventsConsume.deleteEvent(eventId);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const changeEventsState = createAsyncThunk<ResponseModel, any>(
  "events/changeEventsState",
  async (body: any, thunkApi) => {
    try {
      const response = await EventsConsume.PutPublishEvents({
        id: body?.EventsId,
        body: {},
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchEventsView = createAsyncThunk<ResponseModel, any>(
  "events/fetchEventsView",
  async (params = {}, thunkApi) => {
    try {
      const response = await EventsConsume.getAllEvents(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editEvent = createAsyncThunk<ResponseModel, any>(
  "events/editEvent",
  async (editedEvent: object, thunkApi) => {
    try {
      const response = await EventsConsume.putEventById(editedEvent);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addEventRating = createAsyncThunk<ResponseModel, any>(
  "events/addEventRating",
  async (eventRating, thunkApi) => {
    try {
      const response = await EventsConsume.postEventsRating(eventRating);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsSettings.pending, handlePending)
      .addCase(fetchEventsSettings.rejected, handleRejected)
      .addCase(fetchEventsSettings.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.events = (action as PayloadAction<ResponseModel>).payload
          ?.result as EventModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })

      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state?.events?.push(action.payload?.result as EventModel);
      })
      .addCase(addEvent.pending, handlePending)
      .addCase(addEvent.rejected, handleRejected)
      .addCase(fetchEventSectors.fulfilled, (state, action) => {
        state.sectors = action.payload.result as SectorModel[];
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.pageIndex = action.payload.pageIndex;
        state.pagination.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchEventSectors.pending, handlePending)
      .addCase(fetchEventSectors.rejected, handleRejected)
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.eventDetails = action.payload?.result as any;
        state.event = action.payload?.result as EventModel;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(changeEventsState.pending, handlePending)
      .addCase(changeEventsState.rejected, handleRejected)
      .addCase(changeEventsState.fulfilled, handleFulfilled)
      .addCase(fetchEventsView.fulfilled, (state, action) => {
        state.events = action.payload.result as EventModel[];
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.pageIndex = action.payload.pageIndex;
        state.pagination.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchEventsView.pending, handlePending)
      .addCase(fetchEventsView.rejected, handleRejected)
      .addCase(editEvent.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.event = action.payload?.result as EventModel;
      })
      .addCase(editEvent.pending, handlePending)
      .addCase(editEvent.rejected, handleRejected)
      .addCase(addEventRating.fulfilled, handleFulfilled);
  },
});
const handlePending = (state: EventsState) => {
  state.status = RequestStatus.loading;
};

const handleFulfilled = (state: EventsState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: EventsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default eventsSlice.reducer;
