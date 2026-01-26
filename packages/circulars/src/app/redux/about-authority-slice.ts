import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { AuthorityDefinationConsume } from "@4eplatform/shared/apis/authority_defination";
import { AboutAuthorityModel } from "../model/about-authority-model";


interface AboutAuthorityState {
  aboutAuthority: AboutAuthorityModel;
  status: RequestStatus;
  error: string | null;
  message: string;
}

const initialState: AboutAuthorityState = {
  aboutAuthority: new AboutAuthorityModel(),
  status: RequestStatus.idle,
  error: "",
  message: "",
};

export const fetchAboutAuthority = createAsyncThunk<ResponseModel, any>(
  "aboutAuthority/getAboutAuthority",
  async (thunkApi) => {
    try {
      const response = await  AuthorityDefinationConsume?.getAboutAuthority();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const postAboutAuthority = createAsyncThunk<ResponseModel, any>(
    "aboutAuthority/postAboutAuthority",
    async (body: string, thunkApi) => {
      try {
        const response = await AuthorityDefinationConsume?.addAboutAuthority(body);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err?.message);
      }
    }
  );


const aboutAuthoritySlice = createSlice({
  name: "aboutAuthority",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutAuthority.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.aboutAuthority = (action as PayloadAction<ResponseModel>).payload
          .result as AboutAuthorityModel;
      })
     
      .addCase(fetchAboutAuthority.pending, handlePending)
      .addCase(fetchAboutAuthority.rejected, handleRejected)

      .addCase(postAboutAuthority.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.aboutAuthority = (action as PayloadAction<ResponseModel>).payload
          .result as AboutAuthorityModel;
      })
     
      .addCase(postAboutAuthority.pending, handlePending)
      .addCase(postAboutAuthority.rejected, handleRejected)

  },
});

const handlePending = (state: AboutAuthorityState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: AboutAuthorityState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default aboutAuthoritySlice.reducer;
