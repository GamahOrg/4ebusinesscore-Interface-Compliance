
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { NewsConsume } from '@4eplatform/shared/apis/news'
import { ResponseModel } from '../partials/response-model'

export const fetchNews = createAsyncThunk<ResponseModel>('fetchNews', async (data :any) => 
{
  const response = await NewsConsume.getAllNews()
  return response
})

export const fetchAllMainHomeNews = createAsyncThunk<ResponseModel>('fetchAllMainHomeNews', async (data :any) => 
{
  const response = await NewsConsume.getAllMainHomeNews()
  return response
})

interface newsState {
  data: any
  homeNewsData: any
  loading: boolean
  error: string | null
  message: string | null
  totalPages:number;
  totalItems:number;
}

const initialState: newsState = {
  data: {},
  homeNewsData: {},
  loading: false,
  error: null,
  message: '',
  totalPages:1,
  totalItems:0,
}

const NewsCountSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
   
      //Lastest News

      builder.addCase(fetchNews.pending, (state) => {
        state.loading = true
      }).addCase(fetchNews.fulfilled, (state, action) => {
        state.data = action.payload.result as object
        state.loading = false
        state.error = null; 
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems
      }).addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      .addCase(fetchAllMainHomeNews.pending, (state) => {
        state.loading = true
      }).addCase(fetchAllMainHomeNews.fulfilled, (state, action) => {
        state.homeNewsData = action.payload.result as object
        state.loading = false
        state.error = null; 
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems
      }).addCase(fetchAllMainHomeNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })

    },
  })

export default NewsCountSlice.reducer
