import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../partials/response-model";
import { NewsConsume } from "@4eplatform/shared/apis/news";
import { SectorByIdModel } from "../model/sectors/sector-by-Id-model";

export const fetchSector = createAsyncThunk<ResponseModel, any>(
  "fetchSectorById",
  async (data: any) => {
    const response = await NewsConsume.getSector(data);
    return response;
  }
);
interface sectorState {
  data: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: sectorState = {
  data: {},
  loading: false,
  error: null,
  message: "",
};

const SectorDetailsSlice = createSlice({
  name: "sectorById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSector.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSector.fulfilled, (state, action) => {
        state.data = action.payload.result as SectorByIdModel;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});
export default SectorDetailsSlice.reducer;
