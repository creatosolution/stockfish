import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'services/ApiService';
import { notification } from 'antd';
import utils from "utils";
import Utils from 'utils';


export const initialState = {
	loading: false,
	creditLoading: false,
	accountList: [],
	accountIdList: [],
	positions: [],
	orders: []
}

function createSummary(positions){
	let positionsSummary = [];
	let dataMap = {};

	for(var i=0; i<positions.length; i++){
	  let posObj = positions[i];
		if(!dataMap.hasOwnProperty(posObj['Symbol'])){
		
	
		  let summaryObj = {
			"Symbol": posObj['Symbol'],
			"SymbolIndex": `${posObj['Symbol']}_${i}`,
			"PriceOpen": posObj['PriceOpen'],
			"PriceCurrent": posObj['PriceCurrent'],
			"Profit": posObj['Profit'],
			"Volume": 0,
			"Action": 0
		  }
	
		summaryObj.Volume = posObj['Action'] == 0 ? summaryObj['Volume'] + posObj['Volume'] :  summaryObj['Volume'] - posObj['Volume']
	
		posObj['Volume'] = posObj['Action'] == 0 ? `${posObj['Volume']}` : `-${posObj['Volume']}`
		  
		  summaryObj.children = [posObj]
		  
		  dataMap[posObj['Symbol']] = summaryObj
		} else {
		
			//posObj['Symbol']['children'].push(posObj)
			console.log('Before', dataMap[posObj['Symbol']]['children'].length);
			
			dataMap[posObj['Symbol']]['Volume'] =  posObj['Action'] == 0 ?	dataMap[posObj['Symbol']]['Volume'] + posObj['Volume'] :  	dataMap[posObj['Symbol']]['Volume'] - posObj['Volume']
			
			
			dataMap[posObj['Symbol']]['PriceOpen'] =  dataMap[posObj['Symbol']]['PriceOpen'] + posObj['PriceOpen']
			dataMap[posObj['Symbol']]['PriceCurrent'] = dataMap[posObj['Symbol']]['PriceCurrent'] + posObj['PriceCurrent']
			dataMap[posObj['Symbol']]['Profit'] = dataMap[posObj['Symbol']]['Profit'] + posObj['Profit']
			
			
			posObj['Volume'] = posObj['Action'] == 0 ? `${posObj['Volume']}` : `-${posObj['Volume']}`
		
		
			dataMap[posObj['Symbol']]['children'].push(posObj)
			console.log('After', dataMap[posObj['Symbol']]['children'].length);
		
		}
	}

	for(var key in dataMap) {
		dataMap[key].Action = dataMap[key].Volume > -1 ? 0 : 1
		console.log("dsd", dataMap[key]);
		positionsSummary.push(dataMap[key])

	}
	console.log("positionsSummary", positionsSummary);
	return positionsSummary
}
export const getAccountIdList = createAsyncThunk('/api/getAccountIdList',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAccountIdList();
		const ids =  response.account_list.map(ls=>ls.Login)
		return ids;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAccountList = createAsyncThunk('/api/accountList',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAccountList(data);
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const referesAccountList = createAsyncThunk('/api/referesAccountList',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAccountList(data);
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAccountListByClient = createAsyncThunk('/api/getAccountListByClient',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAccountListByClient(data);
		return response.account_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getPosition = createAsyncThunk('/api/position',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getPosition(data);
		return response.positions;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAllPositions = createAsyncThunk('/api/getAllPositions',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAllPositions(data);
		
		return response.position_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const refereshPositions = createAsyncThunk('/api/refereshPositions',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAllPositions(data);
		return response.position_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})




export const getOrder = createAsyncThunk('/api/getOrder',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getOrder(data);
		return response.orders;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const getAllOrders = createAsyncThunk('/api/getAllOrders',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAllOrders(data);
		return response.order_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})


export const refereshOrders = createAsyncThunk('/api/refereshOrders',async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.getAllOrders(data);
		return response.order_list;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})



export const depositWithdrawal = createAsyncThunk('/api/depositWithdrawal',async (data, { rejectWithValue }) => {
	try {
		let url = '/creditInOut'
		const response = await ApiService.postRequest(url, data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const creditActivity = createAsyncThunk('auth/creditActivity',async (data, { rejectWithValue }) => {
	
	try {
		const response = await ApiService.creditActivity(data) 
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
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
		},
		resetOrders: (state,action)=>{
			state.orders = []
		}


		
	},
	_extraReducers: (builder) => {
		builder
			.addCase(getAccountList.pending, (state, action) => {
				state.accountList = [];
				state.loading = true;
			})
			.addCase(getAccountList.fulfilled, (state, action) => {
				state.accountList = action.payload;
				state.loading = false;
			})

			.addCase(getAccountList.rejected, (state, action) => {
				state.accountList = action.payload;
				state.loading = false;
			})
			.addCase(referesAccountList.pending, (state, action) => {
			})
			.addCase(referesAccountList.fulfilled, (state, action) => {
				state.accountList = action.payload;
			})
			.addCase(referesAccountList.rejected, (state, action) => {
			})
			.addCase(getAccountIdList.pending, (state, action) => {
				state.accountIdList = [];
				state.loading = true;
			})
			.addCase(getAccountIdList.fulfilled, (state, action) => {
				state.accountIdList = action.payload;
				state.loading = false;
			})

			.addCase(getAccountIdList.rejected, (state, action) => {
				state.accountIdList = action.payload;
				state.loading = false;
			})

			.addCase(getAccountListByClient.pending, (state, action) => {
				state.loading = true;
				state.accountList = [];
			})
			.addCase(getAccountListByClient.fulfilled, (state, action) => {
				state.accountList = action.payload;
				state.loading = false;
			})
			.addCase(getAccountListByClient.rejected, (state, action) => {
				state.accountList = action.payload;
				state.loading = false;
			})


			.addCase(getPosition.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getPosition.fulfilled, (state, action) => {
				state.positions = action.payload;
				state.loading = false;
			})
			.addCase(getPosition.rejected, (state, action) => {
				state.positions = action.payload;
				state.loading = false;
			})

			.addCase(getAllPositions.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllPositions.fulfilled, (state, action) => {

				state.positions = createSummary(action.payload);
				state.loading = false;
			})
			.addCase(getAllPositions.rejected, (state, action) => {
				state.positions = action.payload;
				state.loading = false;
			})



			.addCase(refereshPositions.pending, (state, action) => {
			})
			.addCase(refereshPositions.fulfilled, (state, action) => {
				state.positions = createSummary(action.payload)
			})
			.addCase(refereshPositions.rejected, (state, action) => {
				// state.positions = action.payload
			})






			.addCase(getOrder.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.loading = false;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.orders = action.payload;
				state.loading = false;
			})

			.addCase(getAllOrders.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.loading = false;
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				state.orders = action.payload;
				state.loading = false;
			})



			.addCase(refereshOrders.pending, (state, action) => {
			})
			.addCase(refereshOrders.fulfilled, (state, action) => {
				state.orders = action.payload;
			})
			.addCase(refereshOrders.rejected, (state, action) => {
				// state.positions = action.payload
			})




			.addCase(depositWithdrawal.pending, (state, action) => {
				state.creditLoading = true;
			})
			.addCase(depositWithdrawal.fulfilled, (state, action) => {
				state.creditLoading = false;
				if (action.payload?.status && action.payload?.status === 'success') {
					notification.success({ message: action.payload?.msg });
				} else {
					notification.error({ message: action.payload?.message });
				}
			})
			.addCase(depositWithdrawal.rejected, (state, action) => {
				state.creditLoading = false;
				notification.error({ message: 'Somthing went wrong!' });
			})


			.addCase(creditActivity.pending, (state, action) => {
				state.creditLoading = false;
			})
			.addCase(creditActivity.fulfilled, (state, action) => {
				state.creditActivity = false;
				 
			})
			.addCase(creditActivity.rejected, (state, action) => {
				state.creditLoading = false;
			})


			},
	get extraReducers() {
		return this._extraReducers;
	},
	set extraReducers(value) {
		this._extraReducers = value;
	},
})
export const {updateAccountList,resetAccountList, resetPosition, resetOrders} =  creditSlice.actions
export default creditSlice.reducer