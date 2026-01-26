import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { DigitalMediaAggConsume } from "@4eplatform/shared/apis/digital_media_agg";
import { OrgHierarchyDefinationModel } from "../model/Departments-model";
import { AuthorityDefinationConsume } from "@4eplatform/shared/apis/authority_defination";
import { DepartmentStatisticsModel } from "../model/department-statistics-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface OrgDefinationState {
  orgDefination: OrgHierarchyDefinationModel[];
  org: OrgHierarchyDefinationModel;
  orgWithoutContent: OrgHierarchyDefinationModel;
  orgCategory: DepartmentStatisticsModel[];
  loading: boolean;
  status: RequestStatus;
  error: string | null;
  message: string;
}

const initialState: OrgDefinationState = {
  orgDefination: [],
  org: new OrgHierarchyDefinationModel(),
  orgWithoutContent: new OrgHierarchyDefinationModel(),
  orgCategory: [],
  loading: false,
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

export const fetchOrgDefination = createAsyncThunk<ResponseModel, any>(
  "orgDefination/getOrgDefination",
  async (query = {}, thunkApi) => {
    try {
      const response = await DigitalMediaAggConsume?.getOrgDefination(query);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const fetchOrgCategory = createAsyncThunk<ResponseModel, any>(
  "OrgHierarchy/GetOrgCategory",
  async (thunkApi) => {
    try {
      const response = await ControlPanelAggConsume?.getOrgCategory();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const fetchOrgDefinationById = createAsyncThunk<ResponseModel, any>(
  "orgDefination/getOrgDefinationById",
  async (id: string, thunkApi) => {
    try {
      const response = await DigitalMediaAggConsume?.getOrgDefinationById(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchOrgDefinationByIdWithoutContent = createAsyncThunk<
  ResponseModel,
  any
>(
  "orgDefination/getOrgDefinationByIdWithoutContent",
  async (id: string, thunkApi) => {
    try {
      const response =
        await DigitalMediaAggConsume?.getOrgWithoutContentById(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchByIdOrgDefinationContent = createAsyncThunk<
  ResponseModel,
  any
>("orgDefination/getByIdOrgDefinationContent", async (params, thunkApi) => {
  try {
    const response =
      await DigitalMediaAggConsume?.getByIdOrgDefinationContent(params);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});
export const addOrgDefinationn = createAsyncThunk<ResponseModel, any>(
  "orgDefination/addOrgDefination",
  async (data, thunkApi) => {
    let formBody = objToFormData(data);
    try {
      const response =
        await AuthorityDefinationConsume?.addOrgDefination(formBody);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const postOrgDefinationURL = createAsyncThunk<ResponseModel, any>(
  "orgDefination/addOrgDefinationURL",
  async (data, thunkApi) => {
    let formBody = objToFormData(data);
    try {
      const response =
        await AuthorityDefinationConsume?.addOrgDefinationURL(formBody);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const deleteOrg = createAsyncThunk<
  ResponseModel,
  number | Number | string
>(
  "OrgDefination/DeleteOrgDefination",
  async (id: number | Number | string, thunkApi) => {
    try {
      let response = await AuthorityDefinationConsume.deleteOrgDefination(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const orgDefinationSlice = createSlice({
  name: "orgDefination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgDefination.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.orgDefination = (action as PayloadAction<ResponseModel>).payload
          .result as OrgHierarchyDefinationModel[];
        state.loading = false;
      })
      .addCase(fetchOrgCategory.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.orgCategory = (action as PayloadAction<ResponseModel>).payload
          .result as DepartmentStatisticsModel[];
        state.loading = false;
      })

      .addCase(fetchOrgDefination.pending, handlePending)
      .addCase(fetchOrgDefination.rejected, handleRejected)
      .addCase(fetchOrgCategory.pending, handlePending)
      .addCase(fetchOrgCategory.rejected, handleRejected)

      .addCase(fetchOrgDefinationById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.org = (action as PayloadAction<ResponseModel>).payload
          .result as OrgHierarchyDefinationModel;
      })
      .addCase(
        fetchOrgDefinationByIdWithoutContent.fulfilled,
        (state, action) => {
          state.status = RequestStatus.succeeded;
          state.orgWithoutContent = (action as PayloadAction<ResponseModel>)
            .payload.result as OrgHierarchyDefinationModel;
        }
      )
      .addCase(deleteOrg.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.message = action.payload?.message;
      })
      .addCase(fetchOrgDefinationById.pending, handlePending)
      .addCase(fetchOrgDefinationById.rejected, handleRejected)
      .addCase(fetchOrgDefinationByIdWithoutContent.pending, handlePending)
      .addCase(fetchOrgDefinationByIdWithoutContent.rejected, handleRejected)
      .addCase(deleteOrg.pending, handlePending)
      .addCase(deleteOrg.rejected, handleRejected)
      .addCase(addOrgDefinationn.pending, handlePending)
      .addCase(addOrgDefinationn.rejected, handleRejected)
      .addCase(addOrgDefinationn.fulfilled, handleFulfilled);
  },
});
const handleFulfilled = (state: OrgDefinationState) => {
  state.status = RequestStatus.succeeded;
  state.loading = false;
};
const handlePending = (state: OrgDefinationState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: OrgDefinationState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

export default orgDefinationSlice.reducer;
