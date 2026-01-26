import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { BasicDetailsModel } from "../model/basicDetails-model";
import { AuthorityDefinationConsume } from "@4eplatform/shared/apis/authority_defination";
import objectToFormData from "@4eplatform/shared/assets/forms/FormData";

interface BasicDetailsState {
  basicDetails: BasicDetailsModel;
  status: RequestStatus;
  error: string | null;
}

const initialState: BasicDetailsState = {
  status: RequestStatus.idle,
  error: "",
  basicDetails: new BasicDetailsModel(),
};

export const getAllBasicDetails = createAsyncThunk<ResponseModel, any>(
  "organizationProfileSettings/getBasicDetails",
  async (data: any, thunkApi) => {
    try {
      const response = await AuthorityDefinationConsume?.getBasicDetails();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const addBasicDetails = createAsyncThunk<ResponseModel, any>(
  "organizationProfileSettings/addBasicDetails",
  async (data: any, thunkApi) => {
    let bodyFormData = objectToFormData(data);
    try {
      const response = await AuthorityDefinationConsume?.addBasicDetails(
        bodyFormData
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

const organizationProfileSettingsBasicDetailsSlice = createSlice({
  name: "organizationProfileSettingsBasicDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBasicDetails.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.basicDetails = (action as PayloadAction<ResponseModel>).payload
          .result as BasicDetailsModel;
      })

      .addCase(getAllBasicDetails.pending, handlePending)
      .addCase(getAllBasicDetails.rejected, handleRejected)
      .addCase(addBasicDetails.pending, handlePending)
      .addCase(addBasicDetails.fulfilled, handleFulfilled)
      .addCase(addBasicDetails.rejected, handleRejected);
  },
});

const handlePending = (state: BasicDetailsState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: BasicDetailsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
const handleFulfilled = (state: BasicDetailsState) => {
  state.status = RequestStatus.succeeded;
};

export default organizationProfileSettingsBasicDetailsSlice.reducer;
