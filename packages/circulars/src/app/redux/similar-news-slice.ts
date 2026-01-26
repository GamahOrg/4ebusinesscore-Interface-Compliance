import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {NewsModel} from '../model/news-model'
import {ResponseModel} from '../partials/response-model'
import { NewsByIdModel } from '../model/newsById-model'
import { NewsConsume } from '@4eplatform/shared/apis/news'

export const fetchSimilarNews = createAsyncThunk<ResponseModel , any>('fetchSimilarNews', async (data :any) => 
{
  const response = await NewsConsume.getAllSimilarNews(data?.newsId)
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
  totalPages:1
}

const similarNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
      builder.addCase(fetchSimilarNews.pending, (state) => {
        state.loading = true
      }).addCase(fetchSimilarNews.fulfilled, (state, action) => {
        state.data = action.payload.result as object
        state.loading = false
        state.error = null; 
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems
      }).addCase(fetchSimilarNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      
    },
})
      



export default similarNewsSlice.reducer
