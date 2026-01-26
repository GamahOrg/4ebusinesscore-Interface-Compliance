import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthorsModel } from "../model/authors-model";
import { ResponseModel } from "../partials/response-model";
import { NewsConsume } from '@4eplatform/shared/apis/news'

export const fetchAuthors = createAsyncThunk<ResponseModel, any>(
  "fetchAuthors",
  async (data: any) => {
    const response = await NewsConsume.getAllAuthor({
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
      searchTerm: data?.searchTerm ?? "",
    });
    return response;
  }
);

export const fetchNewsAuthor = createAsyncThunk<ResponseModel, any>(
  "fetchNewsAuthor",
  async (data: any) => {
    const response = await NewsConsume.getAllNewsAuthor({
      pageSize: data?.pageSize ?? 10,
      pageNumber: data?.pageNumber ?? 1,
      authorId: data?.id,
    });
    return response;
  }
);

export const allAuthors = createAsyncThunk<ResponseModel>(
  "fetchAllAuthors",
  async () => {
    const response = await NewsConsume.getAllAuthorWithoutPagination();
    return response;
  }
);
// export const EditAutors= createAsyncThunk<ResponseModel, any>('editAutors', async (data: any, id: any) => {
export const EditAutors = createAsyncThunk<ResponseModel, any>(
  "editAutors",
  async (data: any) => {
    try {
      let body = {
        id: data?.id,
        body: data,
      };
      const response = await NewsConsume.putAuthor(body);
      return response;
    } catch (err: any) {
      return data;
    }
  }
);

export const addAuthors = createAsyncThunk<ResponseModel, any>(
  "addAuthors",
  async (data: any) => {
    const response = await NewsConsume.postAuthor(data);
    return response;
  }
);

export const deleteAuthors = createAsyncThunk<ResponseModel, any>(
  "deleteAuthors",
  async (id: any) => {
    const response = await NewsConsume.deleteAuthor(id);
    return response;
  }
);
export const changeAuthorState = createAsyncThunk<ResponseModel, any>(
  "changeAuthorState",
  async (id: any) => {
    const response = await NewsConsume.changeAuthorState(id);
    return response;
  }
);
interface authorsState {
  data: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  totalPages: number;
  totalItems: number;
}

const initialState: authorsState = {
  data: {},
  loading: false,
  error: null,
  message: "",
  totalItems: 0,
  totalPages: 1,
};

const AuthorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(allAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(allAuthors.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.loading = false;
        state.error = null;
      })
      .addCase(allAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(addAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(deleteAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // changeAuthorState
      .addCase(changeAuthorState.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAuthorState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(changeAuthorState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchNewsAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsAuthor.fulfilled, (state, action) => {
        state.data = action.payload.result as object;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNewsAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default AuthorsSlice.reducer;
