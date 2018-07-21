import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import serviceProviderReducer from './serviceProviderReducer';
import serviceProviderImagesReducer from './serviceProviderImagesReducer';


export default combineReducers({
    routing: routerReducer,
    serviceProviderReducer,
    serviceProviderImagesReducer
})