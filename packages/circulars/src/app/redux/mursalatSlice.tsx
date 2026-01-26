import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

// Async Thunk action creator
export const loginUserMursalat = createAsyncThunk(
  'user/loginUserMursalat',
  async (credentials:{},thunkApi) => {
    try {
      const userData = await UserManagmentConsume.logintoMursalat(credentials);
      return userData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState= {
  currentUser: null,
  token:null,
  isLoading: false,
  error: null,
}

const userMursalatSlice = createSlice({
  name: 'userMursalat',
  initialState,
  reducers: {
    // Reducers for synchronous actions
    // ... (loginStart, loginSuccess, loginFailure)
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserMursalat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserMursalat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginUserMursalat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userMursalatToken = (state) => state.user.token;


export default userMursalatSlice.reducer;