import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { UsersModel } from "../model/users";

export const fetchAllUsers = createAsyncThunk<ResponseModel, any>(
  "allUsers/fetchAllUsers",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllUsers({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        isExpired: false,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
interface users {
  data: UsersModel[];
  totalPages: number;
  totalItems: number;
  status: string;
  message: string;
}
let initialState: users = {
  data: [],
  totalPages: 1,
  totalItems: 1,
  status: "idle",
  message: "",
};

const usersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state: users) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state: users, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as UsersModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        },
      )
      .addCase(
        fetchAllUsers.rejected,
        (state: users, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        },
      );
  },
});

export default usersSlice.reducer;
