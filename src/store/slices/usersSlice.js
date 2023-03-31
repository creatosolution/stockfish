import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'services/ApiService';
import { notification } from 'antd';
import utils from "utils";
import Utils from 'utils';


export const initialState = {
	loading: false, 
	creditLoading: false,
	usersList: []
}

 
export const getAllUsers = createAsyncThunk('/api/getAllUsers',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.clientsUserList(); 
		return response.users;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})
 
export const accountCreate = createAsyncThunk('/api/createUser',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.createUser(data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const accountDisable = createAsyncThunk('/api/accountDisable',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.accountDisable(data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})
export const accountUpdate = createAsyncThunk('/api/accountUpdate',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.accountUpdate(data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateUserInState:(state, action) => {
			state.usersList = action.payload
		},
		
	},
	_extraReducers: (builder) => {
		builder
			.addCase(getAllUsers.pending, (state, action) => {
				state.usersList = [];
				state.loading = true;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.usersList = action.payload;
				state.loading = false;
			})

			.addCase(getAllUsers.rejected, (state, action) => {
				state.usersList = action.payload;
				state.loading = false;
			})
			
			.addCase(accountCreate.pending, (state, action) => {
				state.creditLoading = true;
			})
			.addCase(accountCreate.fulfilled, (state, action) => {
				state.creditLoading = false;

			})
			.addCase(accountCreate.rejected, (state, action) => {
				state.creditLoading = false;
				notification.error({ message: 'Somthing went wrong!' });
			})

			
			.addCase(accountDisable.pending, (state, action) => {
				state.creditLoading = true;
			})
			.addCase(accountDisable.fulfilled, (state, action) => {
				state.creditLoading = false;

			})
			.addCase(accountDisable.rejected, (state, action) => {
				state.creditLoading = false;
				notification.error({ message: 'Somthing went wrong!' });
			})

			.addCase(accountUpdate.pending, (state, action) => {
				state.creditLoading = true;
			})
			.addCase(accountUpdate.fulfilled, (state, action) => {
				state.creditLoading = false;

			})
			.addCase(accountUpdate.rejected, (state, action) => {
				state.creditLoading = false;
				notification.error({ message: 'Somthing went wrong!' });
			})
			

	},
	get extraReducers() {
		return this._extraReducers;
	},
	set extraReducers(value) {
		this._extraReducers = value;
	},
})
export const {updateUserInState} =  usersSlice.actions
export default usersSlice.reducer