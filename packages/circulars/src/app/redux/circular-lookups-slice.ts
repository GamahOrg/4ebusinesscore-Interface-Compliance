import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CircularsConsume } from "@4eplatform/shared/apis/circulars";
import { LookupModel } from "../model/circulars/lockups-model";

export const fetchLkApproval = createAsyncThunk<ResponseModel, any>(
  "circularLookups/fetchLkApproval",
  async (params: any = {}) => {
    const response = await CircularsConsume.getLkApproval({
      pagesize: params?.pageSize,
      pagenumber: params?.pageNumber,
      date: params?.date,
    });
    return response;
  }
);


export const addLkApproval = createAsyncThunk<ResponseModel, any>(
  "circularLookups/addLkApproval",
  async (newLkApproval) => {
    var bodyFormData = new FormData();
    bodyFormData.append("NameAr", newLkApproval?.NameAr);
    bodyFormData.append("NameEn", newLkApproval?.NameEn);
    const response = await CircularsConsume.postLkApproval(bodyFormData);
    return response;
  }
);
export const getOneLkApproval = createAsyncThunk<ResponseModel, any>(
  "circularLookups/getOneLkApproval",
  async (id: any) => {
    const response = await CircularsConsume.getOneLkApproval(id);
    return response;
  }
);
export const editLkApproval = createAsyncThunk<ResponseModel, any>(
  "circularLookups/editLkApproval",
  async (data: any) => {
    try {
      const response = await CircularsConsume.putLkApproval(data);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const deleteLkApproval = createAsyncThunk<ResponseModel, any>(
  "circularLookups/deleteLkApproval",
  async (id: any) => {
    const response = await CircularsConsume.deleteLkApproval(id);
    return response;
  }
);
export const fetchLkIssuer = createAsyncThunk<ResponseModel, any>(
  "circularLookups/fetchLkIssuer",
  async (params: any = {}) => {
    const response = await CircularsConsume.getLkIssuer({
      pagesize: params?.pageSize,
      pagenumber: params?.pageNumber,
      date: params?.date,
    });
    return response;
  }
);

export const addLkIssuer = createAsyncThunk<ResponseModel, any>(
  "circularLookups/addLkIssuer",
  async (newLkApproval) => {
    var bodyFormData = new FormData();
    bodyFormData.append("NameAr", newLkApproval?.NameAr);
    bodyFormData.append("NameEn", newLkApproval?.NameEn);
    const response = await CircularsConsume.postLkIssuer(bodyFormData);
    return response;
  }
);

export const editLkIssuer = createAsyncThunk<ResponseModel, any>(
  "circularLookups/editLkIssuer",
  async (data: any) => {
    try {
      const response = await CircularsConsume.putLkIssuer(data);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const deleteLkIssuer = createAsyncThunk<ResponseModel, any>(
  "circularLookups/deleteLkIssuer",
  async (id: any) => {
    const response = await CircularsConsume.deleteLkIssuer(id);
    return response;
  }
);

export const getOneLkIssuer = createAsyncThunk<ResponseModel, any>(
  "circularLookups/getOneLkIssuer",
  async (id: any) => {
    const response = await CircularsConsume.getOneLkIssuer(id);
    return response;
  }
);
export const fetchLkEnforcement = createAsyncThunk<ResponseModel, any>(
  "circularLookups/fetchLkEnforcement",
  async (params: any) => {
    const response = await CircularsConsume.getLkEnforcement(params);
    return response;
  }
);
interface lookups {
  approvals: LookupModel[];
  issuers: LookupModel[];
  enforcements: LookupModel[];
  approval: LookupModel;
  issuer: LookupModel;
  status: string;
  message: string;
  totalPages: number;
  totalItems: number;
}
let initialState: lookups = {
  approvals: [],
  issuers: [],
  enforcements: [],
  approval: new LookupModel("", "", ""),
  issuer: new LookupModel("", "", ""),
  status: "idle",
  message: "",
  totalPages: 1,
  totalItems: 1,
};

const circularLookupsSlice = createSlice({
  name: "circularLookups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLkApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLkApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvals = action.payload.result as LookupModel[];
        state.totalPages = action.payload.totalPages as number;
        state.totalItems = action.payload.totalItems as number;
      })
      .addCase(fetchLkApproval.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message ?? "An error occurred";
      })
      .addCase(fetchLkIssuer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLkIssuer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issuers = action.payload.result as LookupModel[];
        state.totalPages = action.payload.totalPages as number;
        state.totalItems = action.payload.totalItems as number;
      })
      .addCase(fetchLkIssuer.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message ?? "An error occurred";
      })
      .addCase(fetchLkEnforcement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLkEnforcement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enforcements = action.payload.result as LookupModel[];
      })
      .addCase(fetchLkEnforcement.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message ?? "An error occurred";
      })
      .addCase(addLkApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLkApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "success";
      })
      .addCase(addLkApproval.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(getOneLkApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneLkApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "success";
        state.approval = action.payload.result as LookupModel;
      })
      .addCase(getOneLkApproval.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(deleteLkApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLkApproval.fulfilled, (state, action) => {
        state.message = "success";
      })
      .addCase(deleteLkApproval.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(editLkApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editLkApproval.fulfilled, (state, action) => {
        state.message = "success";
      })
      .addCase(editLkApproval.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(addLkIssuer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLkIssuer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "success";
      })
      .addCase(addLkIssuer.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(getOneLkIssuer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneLkIssuer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "success";
        state.issuer = action.payload.result as LookupModel;
      })
      .addCase(getOneLkIssuer.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(editLkIssuer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editLkIssuer.fulfilled, (state, action) => {
        state.message = "success";
      })
      .addCase(editLkIssuer.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
      .addCase(deleteLkIssuer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLkIssuer.fulfilled, (state, action) => {
        state.message = "success";
      })
      .addCase(deleteLkIssuer.rejected, (state, action) => {
        state.status = "failed";
        state.message = "error";
      })
  },
});

export default circularLookupsSlice.reducer;
