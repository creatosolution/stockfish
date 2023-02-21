import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';
import { notification } from 'antd';
import utils from "utils";
import Utils from 'utils';


export const initialState = {
	loading: false,
	creditLoading: false,
	accountList: [],
	accountIdList: [],
	positions: []
}

export const getAccountIdList = createAsyncThunk('/api/getAccountIdList',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getAccountIdList();
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const getAccountList = createAsyncThunk('/api/accountList',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getAccountList();
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAccountListByClient = createAsyncThunk('/api/getAccountListByClient',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getAccountListByClient(data);
		return [response];
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const accountUpdate = createAsyncThunk('/api/accountUpdate',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.accountUpdate(data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const accountDisable = createAsyncThunk('/api/accountDisable',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.accountDisable(data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const getPosition = createAsyncThunk('/api/position',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getPosition(data);
		return response.positions;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAllPositions = createAsyncThunk('/api/getAllPositions',async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.getAllPositions(data);
		return response.position_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})



export const depositWithdrawal = createAsyncThunk('/api/depositWithdrawal',async (data, { rejectWithValue }) => {
	try {
		let url = '/dep_wth'
		const response = await AuthService.postRequest(url, data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const creditSlice = createSlice({
	name: 'credit',
	initialState,
	reducers: {
		updateAccountList: (state,action)=>{
			state.accountList = action.payload
		},

		resetAccountList: (state,action)=>{
			state.accountList = []
		},

		resetPosition: (state,action)=>{
			state.positions = []
		}

		
	},
	extraReducers: (builder) => {
		builder
		.addCase(getAccountList.pending, (state, action) => {
			state.accountList = []
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
		.addCase(getAccountIdList.pending, (state, action) => {
			state.accountIdList = []
			state.loading = true
		})
		.addCase(getAccountIdList.fulfilled, (state, action) => {
			state.accountIdList = action.payload
			state.loading = false
		})

		.addCase(getAccountIdList.rejected, (state, action) => {
			state.accountIdList = action.payload
			state.loading = false
		})
			
			.addCase(getAccountListByClient.pending, (state, action) => {
				state.loading = true
				state.accountList = []
			})
			.addCase(getAccountListByClient.fulfilled, (state, action) => {
				state.accountList = action.payload;
				state.loading = false
			})
			.addCase(getAccountListByClient.rejected, (state, action) => {
				state.accountList = action.payload
				state.loading = false
			})

			
			.addCase(getPosition.pending, (state, action) => {
				state.loading = true
			})
			.addCase(getPosition.fulfilled, (state, action) => {
				state.positions = action.payload
				state.loading = false
			})
			.addCase(getPosition.rejected, (state, action) => {
				state.positions = action.payload
				state.loading = false
			})
			
			.addCase(getAllPositions.pending, (state, action) => {
				state.loading = true
			})
			.addCase(getAllPositions.fulfilled, (state, action) => {
			
				let positions = [];
				for(var k=0; k<action.payload.length; k++){
					positions = [...positions, ...action.payload[k]]
				}
				// console.log("actoppositions", positions);
				state.positions = positions
				state.loading = false
			})
			.addCase(getAllPositions.rejected, (state, action) => {
				state.positions = action.payload
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


			.addCase(accountUpdate.pending, (state, action) => {
				state.creditLoading = true
			})
			.addCase(accountUpdate.fulfilled, (state, action) => {
				state.creditLoading = false;
				
			})
			.addCase(accountUpdate.rejected, (state, action) => {
				state.creditLoading = false
				notification.error({message: 'Somthing went wrong!'})
			})

			
			.addCase(accountDisable.pending, (state, action) => {
				state.creditLoading = true
			})
			.addCase(accountDisable.fulfilled, (state, action) => {
				state.creditLoading = false;
				
			})
			.addCase(accountDisable.rejected, (state, action) => {
				state.creditLoading = false
				notification.error({message: 'Somthing went wrong!'})
			})
			
	},
})
export const {updateAccountList,resetAccountList, resetPosition} =  creditSlice.actions
export default creditSlice.reducer