import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';

export const initialState = {
	loading: false,
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
	},
})

export default creditSlice.reducer