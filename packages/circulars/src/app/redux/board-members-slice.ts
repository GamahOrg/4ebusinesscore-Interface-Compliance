import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { AuthorityDefinationConsume } from "@4eplatform/shared/apis/authority_defination";
import { DigitalMediaAggConsume } from "@4eplatform/shared/apis/digital_media_agg";
import {
  BoardMembersModel,
  PositionLookupModel,
} from "../model/department-members-model";

interface BoardMembersState {
  //   aboutAuthority: AboutAuthorityModel;
  boardMembers: BoardMembersModel[];
  boardMember: BoardMembersModel;
  position: PositionLookupModel[];
  status: RequestStatus;
  error: string | null;
  message: string;
}

const initialState: BoardMembersState = {
  //   aboutAuthority: new AboutAuthorityModel(),
  boardMembers: [],
  boardMember: new BoardMembersModel(),
  position: [],
  status: RequestStatus.idle,
  error: "",
  message: "",
};
export const objToFormData = (data: any) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if (value)
      //@ts-ignore
      formData.append(key, value);
  }
  return formData;
};
export const fetchAboutAuthority = createAsyncThunk<ResponseModel, any>(
  "aboutAuthority/getAboutAuthority",
  async (thunkApi) => {
    try {
      const response = await AuthorityDefinationConsume?.getAboutAuthority();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const editExternalMember = createAsyncThunk<ResponseModel, any>(
  "boardMembers/editExternalMember",
  async (newMember: any, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("memberId", newMember?.memberId);
    bodyFormData.append("userImage", newMember?.userImage);
    bodyFormData.append("fullName", newMember?.fullName);
    bodyFormData?.append("email", newMember?.email);
    bodyFormData?.append("job", newMember?.job);
    bodyFormData.append("destinationName", newMember?.destinationName);
    bodyFormData.append("startDate", newMember?.startDate);
    bodyFormData.append("endDate", newMember?.endDate);
    bodyFormData.append("memberword", newMember?.memberword);
    bodyFormData.append("lkPositionId", newMember?.lkPositionId);
    bodyFormData.append("entityMember", newMember?.entityMember);
    if (newMember?.memberSocialMedias[0] != null) {
      for (
        let index = 0;
        index < newMember?.memberSocialMedias.length;
        index++
      ) {
        bodyFormData.append(
          "SocialMedia",
          JSON.stringify(newMember?.memberSocialMedias[index]),
        );
      }
    }
    try {
      const response = await AuthorityDefinationConsume?.putExternalMember(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);
export const addExternalMember = createAsyncThunk<ResponseModel, any>(
  "boardMembers/addExternalMember",
  async (newMember: any, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userImage", newMember?.userImage);
    bodyFormData.append("fullName", newMember?.fullName);
    bodyFormData?.append("email", newMember?.email);
    bodyFormData?.append("job", newMember?.job);
    bodyFormData.append("destinationName", newMember?.destinationName);
    bodyFormData.append("startDate", newMember?.startDate);
    bodyFormData.append("endDate", newMember?.endDate);
    bodyFormData.append("memberword", newMember?.memberword);
    bodyFormData.append("lkPositionId", newMember?.lkPositionId);
    bodyFormData.append("entityMember", newMember?.entityMember);
    if (newMember?.memberSocialMedias[0] != null) {
      for (
        let index = 0;
        index < newMember?.memberSocialMedias.length;
        index++
      ) {
        bodyFormData.append(
          "socialMembers",
          JSON.stringify(newMember?.memberSocialMedias[index]),
        );
      }
    }
    try {
      const response = await AuthorityDefinationConsume?.addExternalMember(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const editInternalMember = createAsyncThunk<ResponseModel, any>(
  "boardMembers/editInternalMember",
  async (newMember: any, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("memberId", newMember?.memberId);
    bodyFormData.append("startDate", newMember?.startDate);
    bodyFormData.append("endDate", newMember?.endDate);
    bodyFormData.append("memberword", newMember?.memberword);
    bodyFormData.append("lkPositionId", newMember?.lkPositionId);
    bodyFormData.append("entityMember", newMember?.entityMember);
    if (newMember?.memberSocialMedias[0] != null) {
      for (
        let index = 0;
        index < newMember?.memberSocialMedias.length;
        index++
      ) {
        bodyFormData.append(
          "SocialMedia",
          JSON.stringify(newMember?.memberSocialMedias[index]),
        );
      }
    }
    try {
      const response = await AuthorityDefinationConsume?.putInternalMember(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const addInternalMember = createAsyncThunk<ResponseModel, any>(
  "boardMembers/addInternalMember",
  async (newMember: any, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userId", newMember?.memberId);
    bodyFormData.append("startDate", newMember?.startDate);
    bodyFormData.append("endDate", newMember?.endDate);
    bodyFormData.append("memberword", newMember?.memberword);
    bodyFormData.append("lkPositionId", newMember?.lkPositionId);
    bodyFormData.append("entityMember", newMember?.entityMember);
    if (newMember?.memberSocialMedias[0] != null) {
      for (
        let index = 0;
        index < newMember?.memberSocialMedias.length;
        index++
      ) {
        bodyFormData.append(
          "socialMembers",
          JSON.stringify(newMember?.memberSocialMedias[index]),
        );
      }
    }
    try {
      const response = await AuthorityDefinationConsume?.addInternalMember(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const fetchBoardMembers = createAsyncThunk<ResponseModel, any>(
  "BoardMembers/GetAllBoardMembers",
  async (thunkApi) => {
    try {
      const response = await DigitalMediaAggConsume?.getAllBoardMembers();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const fetchBoardMemberById = createAsyncThunk<
  ResponseModel,
  { id: any; myParams?: any }
>("BoardMembers/fetchBoardMemberById", async ({ id, myParams }, thunkApi) => {
  try {
    const response = await DigitalMediaAggConsume?.getMemberById({
      id,
      params: {
        isInternal: myParams?.isInternal,
      },
    });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});

export const fetchPosition = createAsyncThunk<ResponseModel, any>(
  "boardMembers/fetchPosition",
  async (thunkApi) => {
    try {
      const response = await AuthorityDefinationConsume?.getLkPosition();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  },
);

export const fetchDeleteInternalMember = createAsyncThunk<
  ResponseModel,
  number | Number | string
>(
  "boardMembers/fetchDeleteInternalMember",
  async (id: number | Number | string, thunkApi) => {
    try {
      let response = await AuthorityDefinationConsume.deleteInternalMember(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchDeleteExternalMember = createAsyncThunk<
  ResponseModel,
  number | Number | string
>(
  "boardMembers/fetchDeleteExternalMember",
  async (id: number | Number | string, thunkApi) => {
    try {
      let response = await AuthorityDefinationConsume.deleteExternalMember(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const boardMembersSlice = createSlice({
  name: "boardMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchAboutAuthority.fulfilled, (state, action) => {
      //     state.status = RequestStatus.succeeded;
      //     state.aboutAuthority = (action as PayloadAction<ResponseModel>).payload
      //       .result as AboutAuthorityModel;
      //   })

      //   .addCase(fetchAboutAuthority.pending, handlePending)
      //   .addCase(fetchAboutAuthority.rejected, handleRejected)

      .addCase(editExternalMember.pending, handlePending)
      .addCase(editExternalMember.fulfilled, handleFulfilled)
      .addCase(editExternalMember.rejected, handleRejected)
      .addCase(addExternalMember.pending, handlePending)
      .addCase(addExternalMember.fulfilled, handleFulfilled)
      .addCase(addExternalMember.rejected, handleRejected)
      .addCase(editInternalMember.pending, handlePending)
      .addCase(editInternalMember.fulfilled, handleFulfilled)
      .addCase(editInternalMember.rejected, handleRejected)
      .addCase(addInternalMember.pending, handlePending)
      .addCase(addInternalMember.fulfilled, handleFulfilled)
      .addCase(addInternalMember.rejected, handleRejected)
      .addCase(fetchBoardMembers.pending, handlePending)
      .addCase(fetchBoardMembers.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.boardMembers = (action as PayloadAction<ResponseModel>).payload
          .result as BoardMembersModel[];
      })
      .addCase(fetchBoardMemberById.pending, handlePending)
      .addCase(fetchBoardMemberById.rejected, handleRejected)
      .addCase(fetchBoardMemberById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.boardMember = (action as PayloadAction<ResponseModel>).payload
          .result as BoardMembersModel;
      })
      .addCase(fetchPosition.rejected, handleRejected)
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.position = (action as PayloadAction<ResponseModel>).payload
          .result as PositionLookupModel[];
      })
      .addCase(fetchDeleteInternalMember.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.message = action.payload?.message;
      })
      .addCase(fetchDeleteExternalMember.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.message = action.payload?.message;
      })
      .addCase(fetchDeleteInternalMember.rejected, handleRejected)
      .addCase(fetchDeleteInternalMember.pending, handlePending)
      .addCase(fetchDeleteExternalMember.rejected, handleRejected)
      .addCase(fetchDeleteExternalMember.pending, handlePending);
  },
});

const handlePending = (state: BoardMembersState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: BoardMembersState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
const handleFulfilled = (state: BoardMembersState) => {
  state.status = RequestStatus.succeeded;
};
export default boardMembersSlice.reducer;
