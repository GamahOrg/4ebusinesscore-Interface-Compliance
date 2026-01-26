import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ResponseModel} from '../partials/response-model'
import { NewsConsume } from '@4eplatform/shared/apis/news'


export const fetchImportantNews = createAsyncThunk<ResponseModel>('fetchImportantNews', async () => 
{
  const response = await NewsConsume.getAllImportantNews({
  })
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

const importantNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
      builder.addCase(fetchImportantNews.pending, (state) => {
        state.loading = true
      }).addCase(fetchImportantNews.fulfilled, (state, action) => {
        state.data = action.payload.result as object
        state.loading = false
        state.error = null; 
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems
      }).addCase(fetchImportantNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      
    },
})
      



export default importantNewsSlice.reducer
