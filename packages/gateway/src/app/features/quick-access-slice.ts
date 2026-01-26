import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/circulars/src/app/model/response-model";
import { ActiveQuickAccessModel } from "@4eplatform/circulars/src/app/model/active-quick-access-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { WorkSpaceModel } from "@4eplatform/circulars/src/app/model/WorkSpaceModel";
import { QuickAccessModel } from "@4eplatform/circulars/src/app/model/QuickAccessModel";
export const fetchActiveQuickAccess = createAsyncThunk<ResponseModel, any>(
  "active-quick-access",
  async (data: any, thunkApi) => {
    try {
      // const response = await homeApiConsume.getActiveQuickAccess("");
      const response = await ControlPanelAggConsume.getActiveQuickAccess("");
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const putQuickAccess = createAsyncThunk<ResponseModel, any>(
  "put-quick-access",
  async (data, thunkApi) => {
    try {
      const response = await UserManagmentConsume.putQuickAccess(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const fetchAllWorkspacesByLoggedUserRoles = createAsyncThunk<
  ResponseModel,
  any
>("all-workspaces", async (data: any, thunkApi) => {
  try {
    const response =
      await ControlPanelAggConsume.getAllWorkspacesByLoggedUserRoles({
        pageNumber: 1,
        pageSize: 1000,
      });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});
export const fetchUserQuickAccess = createAsyncThunk<ResponseModel, any>(
  "user-quick-access",
  async (data: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getUserQuickAcess({
        pageNumber: 1,
        pageSize: 1000,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchAllExternalSubsystemAndWorkspacesByLoggedUserRoles = createAsyncThunk<
  ResponseModel,
  any
>(
  "all-workspaces/fetchAllExternalSubsystemAndWorkspacesByLoggedUserRoles",
  async (data: any, thunkApi) => {
    try {
      const response =
        await ControlPanelAggConsume.getAllExternalSubsystemAndWorkspacesByLoggedUserRoles(
         data
        );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const postFlagQuickAccess = createAsyncThunk<ResponseModel, any>(
  "post-flag-quick-access",
  async (data, thunkApi) => {
    try {
      const response =
        await ControlPanelAggConsume.postFlagQuickAccess(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface UserData {
  data: ActiveQuickAccessModel[];
  allWorkspaces: WorkSpaceModel[];
  workspaces: WorkSpaceModel[];
  userQuickAccess: ActiveQuickAccessModel[];
  status: string;
  totalPages: number;
  message: string;
}

let initialState: UserData = {
  data: [
    new ActiveQuickAccessModel(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      new Date(),
      new Date(),
      false,
      "",
      "",
      ""
    ),
  ],
  allWorkspaces: [new WorkSpaceModel(
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    false,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    new Date()
  )],
  userQuickAccess: [
    new ActiveQuickAccessModel(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      new Date(),
      new Date(),
      false,
      "",
      "",
      ""
    ),
  ],
  workspaces: [
    new WorkSpaceModel(
      "",
      "",
      "",
      "",
      "",
      0,
      0,
      false,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      new Date()
    ),
  ],
  status: "idle",
  totalPages: 0,
  message: "",
};

const activeQuickAccessSlice = createSlice({
  name: "active-quick-access",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveQuickAccess.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        fetchActiveQuickAccess.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as unknown as ActiveQuickAccessModel[];
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchActiveQuickAccess.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(
        fetchAllWorkspacesByLoggedUserRoles.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.workspaces = action.payload
            .result as unknown as WorkSpaceModel[];
        }
      )
      .addCase(
        fetchUserQuickAccess.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.userQuickAccess = action.payload
            .result as unknown as ActiveQuickAccessModel[];
        }
      ).addCase(
        fetchAllExternalSubsystemAndWorkspacesByLoggedUserRoles.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.allWorkspaces = action.payload.result as unknown as WorkSpaceModel[];
        }
      );
  },
});

export default activeQuickAccessSlice.reducer;
