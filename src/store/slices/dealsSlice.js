import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';
import { notification } from 'antd';

export const initialState = {
	loadingDeals: false,
	dealsListWithSearch: [],
	dealsList: [],
	userBalanceAndEquity : [],
	loadingEquity: false
}

export const getDealsList = createAsyncThunk('/api/dealsList', async ({ data, withSearch }, { rejectWithValue }) => {
	try {
		let url = '/dealslist_post'
		let response = withSearch ? await AuthService.postRequest(url, data) : await AuthService.getAllDeals() 
		return response ? response : {};
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const getUserBalanceAndEquity = createAsyncThunk('/api/account_balance',async (data, { rejectWithValue }) => {
	try {
		let url = '/account_balance'
		const response = await AuthService.postRequest(url,data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const dealsSlice = createSlice({
	name: 'deals',
	initialState,
	reducers: { 
		resetdealsListState: (state, action) => {
			state.dealsList = []
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDealsList.pending, (state, action) => {
				state.loadingDeals = true
			})
			.addCase(getDealsList.fulfilled, (state, action) => {
				state.dealsList = action.payload;
				state.loadingDeals = false;
				
				if(Object.keys(action.payload)?.length === 0){
					notification.error({message: 'No record found!'})
				}
			})
			.addCase(getDealsList.rejected, (state, action) => {
				state.dealsList = action.payload
				state.loadingDeals = false
			})
			.addCase(getUserBalanceAndEquity.pending, (state, action) => {
				state.loadingEquity = true
			})
			.addCase(getUserBalanceAndEquity.fulfilled, (state, action) => {
				state.userBalanceAndEquity = action.payload
				state.loadingEquity = false
			})
			.addCase(getUserBalanceAndEquity.rejected, (state, action) => {
				state.userBalanceAndEquity = action.payload
				state.loadingEquity = false
			})
	},
})
export const {resetdealsListState} =  dealsSlice.actions
export default dealsSlice.reducer