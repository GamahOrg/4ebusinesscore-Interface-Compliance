import { AuthorityDefinationConsume } from "@4eplatform/shared/apis/authority_defination";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { SocialLookupModel } from "../model/social-media-lookup";
import { SocialsModel } from "../model/social-media";

interface SocialMediaState {
  socials: SocialsModel[];
  socialLookups: SocialLookupModel[];
  status: RequestStatus;
  error: string | null;
}

const initialState: SocialMediaState = {
  socials: [],
  status: RequestStatus.idle,
  error: "",
  socialLookups: [],
};

export const getAllLK_SocialMedia = createAsyncThunk<ResponseModel, any>(
  "SocialMedia/getAllLKSocialMedia",
  async (data: any, thunkApi) => {
    try {
      const response = await AuthorityDefinationConsume?.getAllLK_SocialMedia();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const addSocialMedia = createAsyncThunk<ResponseModel, any>(
  "SocialMedia/addSocialMedia",
  async (data: any) => {
    const response = await AuthorityDefinationConsume.addSocialMedia(data);
    return response;
  }
);

export const getSocials = createAsyncThunk<ResponseModel, any>(
  "SocialMedia/getSocialMedia",
  async (params = {}, thunkApi) => {
    try {
      const response = await AuthorityDefinationConsume.getSocialMedia();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteSocialMedia = createAsyncThunk<ResponseModel, any>('SocialMedia/deleteSocialMedia', async (id: any) => {
    const response = await AuthorityDefinationConsume.deleteSocialMedia(id)
    return response
  })
  
const SocialMediaSlice = createSlice({
  name: "SocialMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLK_SocialMedia.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.socialLookups = (action as PayloadAction<ResponseModel>).payload
          .result as SocialLookupModel[];
      })
      .addCase(getAllLK_SocialMedia.pending, handlePending)
      .addCase(getAllLK_SocialMedia.rejected, handleRejected)
      .addCase(addSocialMedia.pending, handlePending)
      .addCase(addSocialMedia.fulfilled, handleFulfilled)
      .addCase(addSocialMedia.rejected, handleRejected)
      .addCase(getSocials.pending, handlePending)
      .addCase(getSocials.rejected, handleRejected)
      .addCase(getSocials.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.socials = (action as PayloadAction<ResponseModel>).payload
          .result as SocialsModel[];
      });
  },
});

const handlePending = (state: SocialMediaState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: SocialMediaState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
const handleFulfilled = (state: SocialMediaState) => {
  state.status = RequestStatus.succeeded;
};

export default SocialMediaSlice.reducer;
