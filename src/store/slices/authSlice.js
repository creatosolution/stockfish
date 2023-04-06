import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import FirebaseService from 'services/FirebaseService';
import ApiService from 'services/ApiService';

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null,
	user: null
}

export const signIn = createAsyncThunk('login',async (data, { rejectWithValue }) => {
	const { username, password } = data
	try {
		const response = await ApiService.login({username, password});
	
		const token = response.role_id ==1 ? response.adminToken : response.token;
		if(!token){
			  return rejectWithValue(response)
		}
		localStorage.setItem(AUTH_TOKEN, token);
		localStorage.setItem("userId", username);
		localStorage.setItem("userRole",  response.role_id);
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.message || 'Error')
	}
})

export const saveLoginActivity = createAsyncThunk('auth/saveLoginActivity',async (data, { rejectWithValue }) => {
	
	try {
		const response = await ApiService.saveLoginActivity(data) 
		return response;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})


export const signUp = createAsyncThunk('auth/register',async (data, { rejectWithValue }) => {
	const { email, password } = data
	try {
		const response = await ApiService.register({email, password})
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const signOut = createAsyncThunk('auth/logout',async (data, { rejectWithValue }) => {
	
    const response = await ApiService.logout(data)
	

    return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
    try {
		const response = await ApiService.loginInOAuth()
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async (_, { rejectWithValue }) => {
    try {
		const response = await ApiService.loginInOAuth()
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = "/"
				state.token = action.payload.role_id ==1 ? action.payload.adminToken : action.payload.token; //action.payload.token
				state.user = action.payload
			})
			.addCase(signIn.rejected, (state, action) => {
				// state.message = action.payload
				state.showMessage = true
				state.loading = false
			})

			.addCase(saveLoginActivity.pending, (state) => {
				state.loading = true
			})
			.addCase(saveLoginActivity.fulfilled, (state, action) => {
				state.loading = false
				
			})
			.addCase(saveLoginActivity.rejected, (state, action) => {
				// state.message = action.payload
				state.showMessage = true
				state.loading = false
			})

			
			.addCase(signOut.fulfilled, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithFacebook.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithFacebook.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithFacebook.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer