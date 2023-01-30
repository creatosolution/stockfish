import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';

export const initialState = {
	loadingDeals: false,
	dealsList: []
}

export const getDealsList = createAsyncThunk('/api/dealsList',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getdealsList(data);
		return response ? response : {};
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const dealsSlice = createSlice({
	name: 'deals',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDealsList.pending, (state, action) => {
				state.loadingDeals = true
			})
			.addCase(getDealsList.fulfilled, (state, action) => {
				state.dealsList = action.payload
				state.loadingDeals = false
			})
			.addCase(getDealsList.rejected, (state, action) => {
				state.dealsList = action.payload
				state.loadingDeals = false
			})
	},
})

export default dealsSlice.reducer