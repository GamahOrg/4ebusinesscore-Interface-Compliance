import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { DocumentInfoModel } from "../model/circulars/document-info-model";
import { CircularsConsume } from '@4eplatform/shared/apis/circulars';

interface DocumentInfoState {
  documentInfo: DocumentInfoModel;
  status: RequestStatus;
  error: string | null;
}

const initialState: DocumentInfoState = {
  documentInfo: new DocumentInfoModel(),
  status: RequestStatus.idle,
  error: "",
};

// add/edit documentInfo
export const addDocumentInfo = createAsyncThunk<ResponseModel, any>(
  "documentInfo/addDocumentInfo",
  async (data, thunkApi) => {
    try {
      const response = await CircularsConsume.postDocumentInfo(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// git documentInfo by circularId ??id or circularId
export const getDocumentInfo = createAsyncThunk<ResponseModel, any>(
  "documentInfo/getDocumentInfo",
  async (id, thunkApi) => {
    try {
      const response = await CircularsConsume.getDocumentInfoByCircularId(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const documentInfoSlice = createSlice({
  name: "documentInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDocumentInfo.pending, handlePending)
      .addCase(addDocumentInfo.rejected, handleRejected)
      .addCase(addDocumentInfo.fulfilled, handleFulfilled)
      .addCase(getDocumentInfo.pending, handlePending)
      .addCase(getDocumentInfo.rejected, handleRejected)
      .addCase(getDocumentInfo.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.documentInfo = (action as PayloadAction<ResponseModel>).payload
          .result as DocumentInfoModel ;
      });
  },
});

const handlePending = (state: DocumentInfoState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: DocumentInfoState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: DocumentInfoState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default documentInfoSlice.reducer;
