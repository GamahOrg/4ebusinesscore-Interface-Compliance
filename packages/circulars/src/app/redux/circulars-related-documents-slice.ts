import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { CircularsConsume } from "@4eplatform/shared/apis/circulars";
import { CircularRelatedDocumentModel } from "../model/circulars/circular-related-document-model";

interface CircularsRelatedDocumentsState {
  relatedDocuments: CircularRelatedDocumentModel[];
  status: RequestStatus;
  error: string | null;
}

const initialState: CircularsRelatedDocumentsState = {
  relatedDocuments: [],
  status: RequestStatus.idle,
  error: "",
};
// all get requests
export const fetchAllRelatedDocumentsByCircularId = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchAllRelatedDocumentsByCircularId",
  async (circularId: string, thunkApi) => {
    try {
      const response =
        await CircularsConsume.getAllRelatedDocumentsByCircularId(circularId);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchIssuerSourceByCircularNumber = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchIssuerSourceByCircularNumber",
  async (data: any, thunkApi) => {
    try {
      const response =
        await CircularsConsume.getIssuerSourceByCircularNumber(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchNumberIssuerByCircularSource = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchNumberIssuerByCircularSource",
  async (data: any, thunkApi) => {
    try {
      const response =
        await CircularsConsume.getNumberIssuerByCircularSource(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchSourceNumberByCircularIssuer = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchSourceNumberByCircularIssuer",
  async (data: any, thunkApi) => {
    try {
      const response =
        await CircularsConsume.getSourceNumberByCircularIssuer(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchIssuerNumberSourceByDate = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchIssuerNumberSourceByDate",
  async (data: any, thunkApi) => {
    try {
      const response = await CircularsConsume.getIssuerNumberSourceByDate(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchSourceNumberByCircularIssuerIdAndDate = createAsyncThunk<
  ResponseModel,
  any
>(
  "circularsRelatedDocuments/fetchSourceNumberByCircularIssuerIdAndDate",
  async (params: any) => {
    const response =
      await CircularsConsume.getSourceNumberByCircularIssuerIdAndDate(params);
    return response;
  }
);
// crud add/edit/delete circular
export const addRelatedDocument = createAsyncThunk<ResponseModel, any>(
  "circularsRelatedDocuments/addRelatedDocument",
  async (circular, thunkApi) => {
    try {
      const response = await CircularsConsume.postRelatedDocuments(circular);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const editRelatedDocument = createAsyncThunk<ResponseModel, any>(
  "circularsRelatedDocuments/editRelatedDocument",
  async (circular, thunkApi) => {
    try {
      const response = await CircularsConsume.putRelatedDocuments(circular);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const circularsRelatedDocumentsSlice = createSlice({
  name: "circularsRelatedDocuments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllRelatedDocumentsByCircularId.fulfilled,
        (state, action) => {
          state.status = RequestStatus.succeeded;
          state.relatedDocuments = action.payload
            ?.result as CircularRelatedDocumentModel[];
        }
      )
      .addCase(addRelatedDocument.pending, handlePending)
      .addCase(addRelatedDocument.rejected, handleRejected)
      .addCase(addRelatedDocument.fulfilled, handleFulfilled)
      .addCase(editRelatedDocument.pending, handlePending)
      .addCase(editRelatedDocument.rejected, handleRejected)
      .addCase(editRelatedDocument.fulfilled, handleFulfilled);
  },
});
const handlePending = (state: CircularsRelatedDocumentsState) => {
  state.status = RequestStatus.loading;
};

const handleFulfilled = (state: CircularsRelatedDocumentsState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: CircularsRelatedDocumentsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default circularsRelatedDocumentsSlice.reducer;
