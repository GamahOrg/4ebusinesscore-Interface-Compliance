import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrgConsume } from "@4eplatform/shared/apis/org";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { OrgsModel } from "../model/circulars/orgs-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ManagementModel } from "../model/circulars/managent-model";

export const fetchEmloyeeManagement = createAsyncThunk<ResponseModel, any>(
  "Orgs/fetchEmloyeeManagement",
  async (params: any) => {
    const response = await ControlPanelAggConsume.getEmployee({
      search: params?.search,
    });
    return response;
  }
);
export const fetchOrgs = createAsyncThunk<ResponseModel, object>(
  "Orgs/fetchOrgs",
  async (params = {}, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgs(params);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const fetchOrgsWithSearch = createAsyncThunk<ResponseModel, object>(
  "Orgs/fetchOrgsWithSearch",
  async (params = {}, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgsBySearch(params);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface orgs {
  data: OrgsModel[];
  orgsWithSearch: OrgsModel[];
  mangmentEmployees: ManagementModel[];
  status: string;
  message: string;
}
let initialState: orgs = {
  data: [],
  orgsWithSearch: [],
  mangmentEmployees: [],
  status: "idle",
  message: "",
};

const orgsSlice = createSlice({
  name: "userOrgs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state: orgs) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgs.fulfilled,
        (state: orgs, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as OrgsModel[];
        }
      )
      .addCase(
        fetchOrgs.rejected,
        (state: orgs, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        }
      )
      .addCase(fetchEmloyeeManagement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmloyeeManagement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mangmentEmployees = action.payload.result as ManagementModel[];
      })
      .addCase(fetchEmloyeeManagement.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message ?? "An error occurred";
      })
      .addCase(fetchOrgsWithSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrgsWithSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgsWithSearch = action.payload.result as OrgsModel[];
      })
      .addCase(fetchOrgsWithSearch.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message ?? "An error occurred";
      });
  },
});

export default orgsSlice.reducer;
