import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDataPortfolio } from '../services/appService'

// async thunk
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getDataPortfolio()
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Fetch users failed'
      )
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default userSlice.reducer
