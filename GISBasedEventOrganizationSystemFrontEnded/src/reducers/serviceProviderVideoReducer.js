import { RETRIEVE_SERVICE_PROVIDER_VIDEOS } from "../actions/serviceProviderAction";
const images = [];

export default function serviceProviderImagesReducer(state = images, action) {
    switch (action.type) {
      
        case RETRIEVE_SERVICE_PROVIDER_IMAGES:
            return (
            images.push({images:action.images})
        )    
        default:
            return state;
    }
}