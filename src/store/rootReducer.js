import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import credit from './slices/creditSlice'
import deals from './slices/dealsSlice'
import users from './slices/usersSlice'
import { AUTH_TOKEN } from 'constants/AuthConstant';

const rootReducer = (asyncReducers) => (state, action) => {


    if (action.type === 'auth/logout/fulfilled') {
        state = undefined;
        localStorage.removeItem(AUTH_TOKEN);
      }
    const combinedReducer = combineReducers({
        theme,
        auth,
        credit,
        deals,
        users,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
