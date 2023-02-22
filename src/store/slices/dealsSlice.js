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

export const getDealsList = createAsyncThunk('/api/dealsList', async (data, { rejectWithValue }) => {
	try {
		let url = '/dealslist_post'
		let response = await AuthService.postRequest(url, data) 
		return response.deal_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAllDeals = createAsyncThunk('/api/getAllDeals', async (data, { rejectWithValue }) => {
	try {
		let response = await AuthService.getAllDeals(data)
		return response.deal_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const refereshDeals = createAsyncThunk('/api/refereshDeals', async (data, { rejectWithValue }) => {
	try {
		let response = await AuthService.getAllDeals(data)
		return response.deal_list;
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
		
			.addCase(getAllDeals.pending, (state, action) => {
				state.loadingDeals = true
			})
			.addCase(getAllDeals.fulfilled, (state, action) => {
				state.dealsList = action.payload
				state.loadingDeals = false
			})
			.addCase(getAllDeals.rejected, (state, action) => {
				state.dealsList = []
				state.loadingDeals = false
			})

			.addCase(refereshDeals.pending, (state, action) => {
				// state.loadingDeals = true
			})
			.addCase(refereshDeals.fulfilled, (state, action) => {
				state.dealsList = action.payload
				state.loadingDeals = false
			})
			.addCase(refereshDeals.rejected, (state, action) => {
				// state.dealsList = []
				state.loadingDeals = false
			})


			
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
				state.dealsList = []
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