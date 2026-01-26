import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../../gateway/src/app/models/response-model";
// import { ResponseModel } from "../partials/tools-box/response-model";
import { NewsConsume } from "@4eplatform/shared/apis/news";

export const fetchSectors = createAsyncThunk<ResponseModel, any>(
  "fetchSectors",
  async (data: any) => {
    const queryParams: {
      pageSize: number;
      pageNumber: number;
      nameEn?: string;
      nameAr?: string;
    } = {
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
    };

    if (data?.nameEn) {
      queryParams.nameEn = data.nameEn;
    }
    
    if (data?.nameAr) {
      queryParams.nameAr = data.nameAr;
    }
    const response = await NewsConsume.getAllSectors(queryParams);
    
    return response;
  }
);

export const fetchNewSector = createAsyncThunk<ResponseModel, any>(
  "fetchNewSector",
  async (data: any) => {
    const response = await NewsConsume.getAllNewSector({
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
      sectorId: data?.id,
    });
    return response;
  }
);

export const allSectors = createAsyncThunk<ResponseModel>(
  "fetchAllSectors",
  async () => {
    const response = await NewsConsume.getAllSectorsWithoutPagination();
    return response;
  }
);

export const EditSectors = createAsyncThunk<ResponseModel, any>(
  "editSectors",
  async (data: any, id: any) => {
    try {
      let body = {
        id: data?.id,
        body: data,
      };
      const response = await NewsConsume.putASector(body);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const addSectors = createAsyncThunk<ResponseModel, any>(
  "addSectors",
  async (data: any) => {
    const response = await NewsConsume.postNewSector(data);
    return response;
  }
);

export const changeSectorState = createAsyncThunk<ResponseModel, any>(
  "changeSectorState",
  async (id: any) => {
    const response = await NewsConsume.changeSectorState(id);
    return response;
  }
);
export const deleteSector = createAsyncThunk<ResponseModel, any>(
  "deleteSector",
  async (id: any) => {
    const response = await NewsConsume.deleteSector(id);
    return response;
  }
);
interface sectorState {
  data: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageIndex:number
}

const initialState: sectorState = {
  data: {},
  loading: false,
  error: null,
  message: "",
  totalItems: 0,
  totalPages: 1,
  pageSize:10,
  pageIndex:1

};

const SectorSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.pageIndex = action.payload.pageIndex;
        state.pageSize = action.payload.pageSize;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(allSectors.pending, (state) => {
        state.loading = true;
      })
      .addCase(allSectors.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.loading = false;
        state.error = null;
      })
      .addCase(allSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addSectors.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSectors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(addSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteSector.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSector.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(deleteSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // changeSectorState
      .addCase(changeSectorState.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeSectorState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(changeSectorState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchNewSector.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewSector.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNewSector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

// export const fetchSectors = createAsyncThunk<ResponseModel>(
//   "fetchSectors",
//   async () => {
//     const response = await NewsConsume.getSectorsWithPagination();
//     return response;
//   }
// );

// export const fetchAllSectors = createAsyncThunk<ResponseModel>(
//   "fetchAllSectors",
//   async () => {
//     const response = await NewsConsume.getAllSectors();
//     return response;
//   }
// );
// export const fetchASector = createAsyncThunk<ResponseModel>(
//   "fetchASector",
//   async (id: any) => {
//     const response = await NewsConsume.getASector(id);
//     return response;
//   }
// );
// export const postNewSector = createAsyncThunk<ResponseModel, any>(
//   "postNewSector",
//   async (data: any) => {
//     const response = await NewsConsume.postNewSector(data);
//     return response;
//   }
// );

// export const putASector = createAsyncThunk<ResponseModel, any>(
//   "putASector",
//   async (data: any, id: any) => {
//     try {
//       let body = {
//         id: data?.id,
//         body: data?.data,
//       };
//       const response = await NewsConsume.putASector(body);
//       return response;
//     } catch (err: any) {
//       return data;
//     }
//   }
// );

// export const deleteSector = createAsyncThunk<ResponseModel, any>(
//   "deleteSector",
//   async (id: any) => {
//     const response = await PlatformConsume.getAllPlatform()
//     const response = await NewsConsume.deleteSector(id);
//     return response;
//   }
// );

// export const deleteSectorState = createAsyncThunk<ResponseModel>(
//   "deleteSectorState",
//   async (id: any) => {
//     const response = await NewsConsume.deleteSectorState(id);
//     return response;
//   }
// );

// interface SectorState {
//   data: any;
//   sectorData: any;
//   loading: boolean;
//   error: string | null;
//   message: string | null;
// }
// const initialState: SectorState = {
//   sectorData: {},
//   data: {},
//   loading: false,
//   error: null,
//   message: "",
// };
// const SectorSlice = createSlice({
//   name: "sector",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//     // fetchSectors
//     .addCase(fetchSectors.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(fetchSectors.fulfilled, (state, action) => {
//       state.sectorData.data = action.payload.result;
//     })
//     .addCase(fetchSectors.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message as string;
//     })
//     // fetch All Sectors
//     .addCase(fetchAllSectors.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(fetchAllSectors.fulfilled, (state, action) => {
//       state.sectorData.data = action.payload.result;
//     })
//     .addCase(fetchAllSectors.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message as string;
//     })
//       // fetchASector

//       .addCase(fetchASector.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchASector.fulfilled, (state, action) => {
//         state.sectorData.data = action.payload.result;
//       })
//       .addCase(fetchASector.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       })
//       // postNewSector

//       .addCase(postNewSector.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(postNewSector.fulfilled, (state, action) => {
//         state.data = action.payload.result as object;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(postNewSector.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       })
//       // postASector

//       .addCase(putASector.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(putASector.fulfilled, (state, action) => {
//         state.data = action.payload.result as object;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(putASector.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       })
//       // deleteSector

//       .addCase(deleteSector.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteSector.fulfilled, (state, action) => {
//         state.data = action.payload.result as object;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(deleteSector.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       })
//       // deleteSectorState

//       .addCase(deleteSectorState.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteSectorState.fulfilled, (state, action) => {
//         state.data = action.payload.result as object;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(deleteSectorState.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message as string;
//       });
//   },
// });

export default SectorSlice.reducer;
