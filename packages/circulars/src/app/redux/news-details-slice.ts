import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {NewsModel} from '../model/news-model'
import {ResponseModel} from '../partials/response-model'
import { NewsByIdModel } from '../model/newsById-model'
import { NewsConsume } from '@4eplatform/shared/apis/news'


export const fetchNewsDetails = createAsyncThunk<ResponseModel , any>('fetchNewsDetails', async (data :any) => 
{
  const response = await NewsConsume.getNewsById(data)
  return response
})

export const getNewsById = createAsyncThunk<ResponseModel , any>('newsById', async (data :any) => 
{
  const response = await NewsConsume.getNewsModelById(data)
  return response
})
interface newsState {
  data: any
  loading: boolean
  error: string | null
  message: string | null
  totalPages:number;
  totalItems:number;
}

const initialState: newsState = {
  data: {},
  loading: false,
  error: null,
  message: '',
  totalItems:0,
  totalPages:1,
}


const NewsDetailsSlice = createSlice({
  name: 'newsById',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
      builder
      // News Details
      .addCase(fetchNewsDetails.pending, (state) => {
        state.loading = true
      }).addCase(fetchNewsDetails.fulfilled, (state, action) => {
        state.data = action.payload.result as object
        state.loading = false
        state.error = null; 
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems
      }).addCase(fetchNewsDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      
      //news ById
      .addCase(getNewsById.pending, (state) => {
        state.loading = true
      }).addCase(getNewsById.fulfilled, (state, action) => {
        state.data = action.payload.result as unknown as NewsByIdModel;
        state.loading = false
        state.error = null; 
      }).addCase(getNewsById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
  },
})
export default NewsDetailsSlice.reducer
