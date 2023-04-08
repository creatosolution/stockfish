import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'services/ApiService';
import { notification } from 'antd';
import utils from "utils";
import Utils from 'utils';


export const initialState = {
	loading: false, 
	creditLoading: false,
	usersList: [],
	usersClientList: [],
	login_logs: [],
	credit_activity_logs:[]
}

 
export const getAllUsers = createAsyncThunk('/api/getAllUsers',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.clientsUserList(); 
		return response.users;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

 
export const importManagers = createAsyncThunk('/api/importManagers',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.importManagers(data); 
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const getLoginActivity = createAsyncThunk('/api/getLoginActivity',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getLoginActivity(); 
		return response.login_logs;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})
export const getCreditActivity = createAsyncThunk('/api/getCreditActivity',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getCreditActivity(); 
		return response.credit_activity_logs;
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


export const getAccountListByUserId = createAsyncThunk('/api/getAccountListByUserId',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAccountListByUserId(data);
		const ids =  response.client_list
		return ids;
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
			.addCase(importManagers.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(importManagers.fulfilled, (state, action) => {
				 
				state.loading = false;
			})

			.addCase(importManagers.rejected, (state, action) => {
			 
				state.loading = false;
			})

			
			.addCase(getLoginActivity.pending, (state, action) => {
				state.login_logs = [];
				state.loading = true;
			})
			.addCase(getLoginActivity.fulfilled, (state, action) => {
				state.login_logs = action.payload;
				state.loading = false;
			})

			.addCase(getLoginActivity.rejected, (state, action) => {
				state.login_logs = action.payload;
				state.loading = false;
			})
			.addCase(getCreditActivity.pending, (state, action) => {
				state.credit_activity_logs = [];
				state.loading = true;
			})
			.addCase(getCreditActivity.fulfilled, (state, action) => {
				state.credit_activity_logs = action.payload;
				state.loading = false;
			})

			.addCase(getCreditActivity.rejected, (state, action) => {
				state.credit_activity_logs = action.payload;
				state.loading = false;
			})
			
			

			.addCase(getAccountListByUserId.pending, (state, action) => {
				state.usersClientList = [];
				state.loading = true;
			})
			.addCase(getAccountListByUserId.fulfilled, (state, action) => {
				state.usersClientList = action.payload;
				state.loading = false;
			})

			.addCase(getAccountListByUserId.rejected, (state, action) => {
				state.usersClientList = action.payload;
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