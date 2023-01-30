import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import credit from './slices/creditSlice'
import deals from './slices/dealsSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        credit,
        deals,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
