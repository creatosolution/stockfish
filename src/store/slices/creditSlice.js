import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';
import { notification } from 'antd';

export const initialState = {
	loading: false,
	creditLoading: false,
	accountList: []
}

export const getAccountList = createAsyncThunk('/api/accountList',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getAccountList();
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const depositWithdrawal = createAsyncThunk('/api/depositWithdrawal',async (data, { rejectWithValue }) => {
	try {
		let url = '/dep_wth'
		const response = await AuthService.postRequest(url,data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const creditSlice = createSlice({
	name: 'credit',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAccountList.pending, (state, action) => {
				state.loading = true
			})
			.addCase(getAccountList.fulfilled, (state, action) => {
				state.accountList = action.payload
				state.loading = false
			})
			.addCase(getAccountList.rejected, (state, action) => {
				state.accountList = action.payload
				state.loading = false
			})
			.addCase(depositWithdrawal.pending, (state, action) => {
				state.creditLoading = true
			})
			.addCase(depositWithdrawal.fulfilled, (state, action) => {
				state.creditLoading = false;
				if(action.payload?.status && action.payload?.status === 'success'){
					notification.success({message: action.payload?.msg})
				}else{
					notification.error({message: action.payload?.message})
				}
			})
			.addCase(depositWithdrawal.rejected, (state, action) => {
				state.creditLoading = false
				notification.error({message: 'Somthing went wrong!'})
			})
	},
})

export default creditSlice.reducer