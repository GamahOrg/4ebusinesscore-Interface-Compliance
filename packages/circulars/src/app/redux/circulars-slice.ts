import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { PublicCircularModel } from "../model/circulars/public-circulars-model";
import { PrivateCircularModel } from "../model/circulars/private-circulars-model";
import { ConfidentialCircularsModel } from "../model/circulars/confidential-circulars-model";
import { CircularsConsume } from "@4eplatform/shared/apis/circulars";
import { CircularModel } from "../model/circulars/circular-model";

interface CircularsState {
  circular: CircularModel;
  accreditationProofs:any;
  allCircularSources:{sources:string[]};
  allCircularIssuer:any;
  allCircularNumbers:{circularNumbers:number[]},
  publicCirculars: PublicCircularModel[];
  privateCirculars: PrivateCircularModel[];
  confidentialCirculars: ConfidentialCircularsModel[];
  publicArchivedCirculars: PublicCircularModel[];
  privateArchivedCirculars: any[];
  confidentialArchivedCirculars: ConfidentialCircularsModel[];
  status: RequestStatus;
  paginationForPrivateCirculars: Pagination;
  paginationForPublicCirculars: Pagination;
  paginationForConfidentialCirculars: Pagination;
  paginationForPrivateArchivedCirculars: Pagination;
  paginationForPublicArchivedCirculars: Pagination;
  paginationForConfidentialArchivedCirculars: Pagination;
  error: string | null;
}

const initialState: CircularsState = {
  circular: new CircularModel(),
  accreditationProofs:[],
  allCircularSources:{sources:[]},
  allCircularIssuer:[],
  allCircularNumbers:{circularNumbers:[]},
  publicCirculars: [],
  privateCirculars: [],
  confidentialCirculars: [],
  publicArchivedCirculars: [],
  privateArchivedCirculars: [],
  confidentialArchivedCirculars: [],
  status: RequestStatus.idle,
  paginationForPrivateCirculars: new Pagination(),
  paginationForPublicCirculars: new Pagination(),
  paginationForConfidentialCirculars: new Pagination(),
  paginationForPrivateArchivedCirculars: new Pagination(),
  paginationForPublicArchivedCirculars: new Pagination(),
  paginationForConfidentialArchivedCirculars: new Pagination(),
  error: "",
};
// all get requests
export const fetchCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchCircular",
  async (circularId: string, thunkApi) => {
    try {
      const response = await CircularsConsume.getCircular(circularId);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAllConfidentialCirculars = createAsyncThunk<
  ResponseModel,
  any
>("circulars/fetchAllConfidentialCirculars", async (params = {}, thunkApi) => {
  try {
    const response = await CircularsConsume.getAllConfidentialCirculars({ body: params.orgConcerned, params });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const fetchAllCircularsPrivate = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllCircularsPrivate",
  async (params = {}, thunkApi) => {
    try {

      const response = await CircularsConsume.getAllCircularsPrivate({ body: params.orgConcerned, params });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllCircularsPublic = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllCircularsPublic",
  async (body, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularsPublic(body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllArchivedConfidentialCirculars = createAsyncThunk<
  ResponseModel,
  any
>("circulars/fetchAllArchivedConfidentialCirculars", async (params = {}, thunkApi) => {
  try {
    const response = await CircularsConsume.getAllConfidentialCirculars({ body: params.orgConcerned, params });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const fetchAllArchivedCircularsPrivate = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllArchivedCircularsPrivate",
  async (params = {}, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularsPrivate({ body: params.orgConcerned, params });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
}
);
export const fetchAllArchivedCircularsPublic = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllArchivedCircularsPublic",
  async (body, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularsPublic(body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllCircularIssuer = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllCircularIssuer",
  async (params = {}, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularIssuer(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllCircularSource = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllCircularSource",
  async (params = {}, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularSource(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAccreditationProofs= createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAccreditationProofs",
  async (params = {}, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularSource(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllCircularNumbers = createAsyncThunk<ResponseModel, any>(
  "circulars/fetchAllCircularNumbers",
  async (params = {}, thunkApi) => {
    try {
      const response = await CircularsConsume.getAllCircularNumbers(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// crud add/edit/delete circular
export const addCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/addCircular",
  async (circular, thunkApi) => {
    try {
      const response = await CircularsConsume.postCircular(circular);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const editCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/editCircular",
  async (circular, thunkApi) => {
    try {
      const response = await CircularsConsume.putCircular(circular);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const archiveCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/archiveCircular",
  async (circular, thunkApi) => {
    try {
      const response = await CircularsConsume.archiveCircular(circular);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/deleteCircular",
  async (circularId: string | number, thunkApi) => {
    try {
      const response = await CircularsConsume.deleteCircular(circularId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteConfidentialCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/deleteConfidentialCircular",
  async (data: any, thunkApi) => {
    try {
      const response = await CircularsConsume.deleteConfidentialCircular(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deletePrivateCircular = createAsyncThunk<ResponseModel, any>(
  "circulars/deletePrivateCircular",
  async (data: any, thunkApi) => {
    try {
      const response = await CircularsConsume.deletePrivateCircular(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const circularsSlice = createSlice({
  name: "circulars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCircular.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.circular = action.payload?.result as CircularModel;
      })
      .addCase(fetchAllConfidentialCirculars.fulfilled, (state, action) => {
        state.confidentialCirculars = action.payload
          .result as ConfidentialCircularsModel[];
        state.paginationForConfidentialCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForConfidentialCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForConfidentialCirculars.pageIndex =
          action.payload.pageIndex;
        state.paginationForConfidentialCirculars.pageSize =
          action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllCircularsPrivate.fulfilled, (state, action) => {
        state.privateCirculars = action.payload
          .result as PrivateCircularModel[];
        state.paginationForPrivateCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForPrivateCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForPrivateCirculars.pageIndex =
          action.payload.pageIndex;
        state.paginationForPrivateCirculars.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllCircularsPublic.fulfilled, (state, action) => {
        state.publicCirculars = action.payload.result as PublicCircularModel[];
        state.paginationForPublicCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForPublicCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForPublicCirculars.pageIndex = action.payload.pageIndex;
        state.paginationForPublicCirculars.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllArchivedConfidentialCirculars.fulfilled, (state, action) => {
        state.confidentialArchivedCirculars = action.payload
          .result as ConfidentialCircularsModel[];
        state.paginationForConfidentialArchivedCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForConfidentialArchivedCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForConfidentialArchivedCirculars.pageIndex =
          action.payload.pageIndex;
        state.paginationForConfidentialArchivedCirculars.pageSize =
          action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllArchivedCircularsPrivate.fulfilled, (state, action) => {
        state.privateArchivedCirculars = action.payload
          .result as PrivateCircularModel[];
        state.paginationForPrivateArchivedCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForPrivateArchivedCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForPrivateArchivedCirculars.pageIndex =
          action.payload.pageIndex;
        state.paginationForPrivateArchivedCirculars.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllArchivedCircularsPublic.fulfilled, (state, action) => {
        state.publicArchivedCirculars = action.payload.result as PublicCircularModel[];
        state.paginationForPublicArchivedCirculars.totalPages =
          action.payload.totalPages;
        state.paginationForPublicArchivedCirculars.totalItems =
          action.payload.totalItems;
        state.paginationForPublicArchivedCirculars.pageIndex = action.payload.pageIndex;
        state.paginationForPublicArchivedCirculars.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(addCircular.pending, handlePending)
      .addCase(addCircular.rejected, handleRejected)
      .addCase(addCircular.fulfilled, handleFulfilled)
      .addCase(editCircular.pending, handlePending)
      .addCase(editCircular.rejected, handleRejected)
      .addCase(editCircular.fulfilled, handleFulfilled)
      .addCase(archiveCircular.pending, handlePending)
      .addCase(archiveCircular.rejected, handleRejected)
      .addCase(archiveCircular.fulfilled, handleFulfilled)
      .addCase(deleteCircular.pending, handlePending)
      .addCase(deleteCircular.rejected, handleRejected)
      .addCase(deleteCircular.fulfilled, handleFulfilled)
      .addCase(deletePrivateCircular.pending, handlePending)
      .addCase(deletePrivateCircular.rejected, handleRejected)
      .addCase(deletePrivateCircular.fulfilled, handleFulfilled)
      .addCase(deleteConfidentialCircular.pending, handlePending)
      .addCase(deleteConfidentialCircular.rejected, handleRejected)
      .addCase(deleteConfidentialCircular.fulfilled, handleFulfilled)
      .addCase(fetchAllCircularSource.fulfilled, (state, action) => {
        state.allCircularSources = action.payload?.result as {sources:string[]} ;
      })
      .addCase(fetchAllCircularIssuer.fulfilled, (state, action) => {
        state.allCircularIssuer = action.payload?.result as {issuers:string[]} ;
      })
      .addCase(fetchAllCircularNumbers.fulfilled, (state, action) => {
        state.allCircularNumbers = action.payload?.result as {circularNumbers:number[]} ;
      })
      .addCase(fetchAccreditationProofs.fulfilled, (state, action) => {
        state.accreditationProofs = action.payload?.result as any ;
      });
  },
});
const handlePending = (state: CircularsState) => {
  state.status = RequestStatus.loading;
};

const handleFulfilled = (state: CircularsState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: CircularsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default circularsSlice.reducer;
