import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";
import { MainClassification } from "../model/MainClassificationModel";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface stateType {
  mainClassification: MainClassification;
  mainClassifications: MainClassification[];
  items: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  pagination: Pagination;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  mainClassification: new MainClassification(),
  mainClassifications: [],
  items: [],
  pagination: new Pagination(),
  totalPages: 1,
  totalItems: 1,
};

export const getMainClassification = createAsyncThunk<any, any>(
  "mainClassification/getMainClassification",
  async (params: any = {}, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getMainClassification({
        pagesize: params?.pageSize,
        pagenumber: params?.pageNumber,
        date: params?.date,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const GetSubsytemSettingsMainClassificationAgg = createAsyncThunk<any,any>(
  "mainClassification/GetSubsytemSettingsMainClassificationAgg",
  async (params?:any) => {
    const response = await ControlPanelAggConsume.getSubsytemSettingsMainClassificationAgg({
        pageSize: params?.pageSize || "1000",
        pageNumber: params?.pageNumber || "1",
        isHome: params?.isHome || false,
      });
    return response;
  }
);
const mainClassificationSlice = createSlice({
  name: "mainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mainClassifications = action?.payload?.result as MainClassification[];
        state.totalPages = action.payload.totalPages as number;
        state.totalItems = action.payload.totalItems as number;
        state.pagination = action?.payload;
      })
      .addCase(getMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(GetSubsytemSettingsMainClassificationAgg.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetSubsytemSettingsMainClassificationAgg.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as [];
      })
      .addCase(GetSubsytemSettingsMainClassificationAgg.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
  },
});

export default mainClassificationSlice.reducer;
