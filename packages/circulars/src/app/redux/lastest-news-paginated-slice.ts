import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../partials/response-model";
import { NewsConsume } from "@4eplatform/shared/apis/news";

export const fetchLastedNewsPaginated = createAsyncThunk<ResponseModel, any>(
  "fetchLastedNewsPaginated",
  async (data: any) => {
    const response = await NewsConsume.getAllLastestNewsPaginated({
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
    });
    return response;
  },
);

export const fetchAllMainHomeNews = createAsyncThunk<ResponseModel, any>(
  "fetchAllMainHomeNews",
  async (data: any) => {
    const response = await NewsConsume.getAllMainHomeNews({
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
    });
    return response;
  },
);

interface newsState {
  data: any;
  homeNewsData: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  totalPages: number;
  totalItems: number;
}

const initialState: newsState = {
  data: {},
  homeNewsData: {},
  loading: false,
  error: null,
  message: "",
  totalItems: 0,
  totalPages: 1,
};

const lastedNewsPaginatedSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastedNewsPaginated.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLastedNewsPaginated.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.loading = false;
        state.error = null;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchLastedNewsPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchAllMainHomeNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMainHomeNews.fulfilled, (state, action) => {
        state.homeNewsData = action.payload.result as object;
        state.loading = false;
        state.error = null;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllMainHomeNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default lastedNewsPaginatedSlice.reducer;
