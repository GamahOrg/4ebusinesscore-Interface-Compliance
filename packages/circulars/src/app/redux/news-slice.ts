import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {NewsModel} from '../model/news-model'
import {ResponseModel} from '../partials/response-model'
import { NewsByIdModel } from '../model/newsById-model'
import { NewsConsume } from '@4eplatform/shared/apis/news'


export const fetchNews = createAsyncThunk<ResponseModel , any>('fetchNews', async (data :any) => 
{
  const response = await NewsConsume.getAllNews({
      pageSize: data?.pageSize??10,
      pageNumber: data?.pageNumber??1,
      startDate:data.startDate,
      title:data.title,
  })
  return response
})

export const addNews = createAsyncThunk<ResponseModel, any>('addNews', async (data: any) => {
    const response = await NewsConsume.postNews(data)
    return response
  })

export const deleteNews = createAsyncThunk<ResponseModel, any>('deleteNews', async (id: any) => {
  const response = await NewsConsume.deleteNews(id)
  return response
})


export const addRateNews = createAsyncThunk<ResponseModel, any>('addRateNews', async (data: any) => {
   
  const response = await NewsConsume.postRateNews(data)
  return response
})


export const fetchNewsDetails = createAsyncThunk<ResponseModel , any>('fetchNewsDetails', async (data :any) => 
{
  const response = await NewsConsume.getGetNewsDetails({
       newsId:data.newsId,
  })
  return response

})

const objToFormData = (data: any) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
      if (value)
          //@ts-ignore
          formData.append(key, value);
  }
  return formData;
};
export const EditNews= createAsyncThunk<ResponseModel, any>('editNews', async (data: any, id: any) => {
  try {
     ;
    var bodyFormData = objToFormData(data);
  
    for (let index = 0; index < data?.attachments?.length; index++) {
      bodyFormData.append("NewsSubImages", data?.attachments[index]);
    }
    let body = {
      id:data?.id,
      body:bodyFormData
    }
    const response = await NewsConsume.putNews(body)
    return response
  } catch (err: any) {
    return data
  }
})
export const changeNewsState = createAsyncThunk<ResponseModel, any>('changeNewsState', async (id: any) => {
  const response = await NewsConsume.changeNewsState(id)
  return response
})
interface newsState {
  data: any
  loading: boolean
  error: string | null
  message: string | null
  totalPages:number;
  totalItems:number;
  pageIndex:number;
  pageSize:number
}

const initialState: newsState = {
  data: {},
  loading: false,
  error: null,
  message: '',
  totalItems:0,
  totalPages:1,
  pageIndex:1,
  pageSize:10
}

const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
      builder.addCase(fetchNews.pending, (state) => {
        state.loading = true
      }).addCase(fetchNews.fulfilled, (state, action) => {
        state.data = action.payload.result as unknown as NewsModel[];
        state.totalPages=action.payload.totalPages
        state.totalItems=action.payload.totalItems 
        state.pageIndex=action.payload.pageIndex
        state.pageSize=action.payload.pageSize
        state.loading = false
        state.error = null; 
      }).addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
      //
      .addCase(addNews.pending, (state) => {
        state.loading = true
      }).addCase(addNews.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.message = 'success'
      }).addCase(addNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      }).addCase(deleteNews.pending, (state) => {
        state.loading = true
      }).addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.message = 'success'
      }).addCase(deleteNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })

      //Add Rate 
     .addCase(addRateNews.pending, (state) => {
      state.loading = true
    }).addCase(addRateNews.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.message = 'success'
    }).addCase(addRateNews.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
    
      // changeAuthorState
      .addCase(changeNewsState.pending, (state) => {
        state.loading = true})
        .addCase(changeNewsState.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.message = 'success'
      }).addCase(changeNewsState.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message as string
      })
  },
})

export default NewsSlice.reducer
