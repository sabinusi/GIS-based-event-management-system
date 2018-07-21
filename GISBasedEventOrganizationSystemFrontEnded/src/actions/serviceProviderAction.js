export const UPDATE_SERVICE_PROVIDER = 'provider:updateProvider';
export const UPDATE_SERVICE_PROVIDER_HALLS = 'service_provider_hall:updateProviderHalls';
export const UPDATE_SERVICE_PROVIDER_DECORATORS = 'service_provider_hall:updateProviderDecorators';
export const UPDATE_SERVICE_PROVIDER_MUSICIAN = 'service_provider_hall:updateProviderMuscians';
export const RETRIEVE_SERVICE_PROVIDER_IMAGES = 'provider:retrieveImages';
export const RETRIEVE_SERVICE_PROVIDER_VIDEOS = 'provider:retrieveVideos';

export const updateProvider = (provider) => {
    return {
        type: UPDATE_SERVICE_PROVIDER,
        provider
    }
}
export const updateProviderHalls = (provider) => {
    return {
        type: UPDATE_SERVICE_PROVIDER_HALLS,
        provider
    }
}
export const updateProviderDecorators = (provider) => {
    return {
        type: UPDATE_SERVICE_PROVIDER_DECORATORS,
        provider
    }
}
export const updateProviderMuscian = (provider) => {
    return {
        type: UPDATE_SERVICE_PROVIDER_MUSICIAN,
        provider
    }
}
export const retriveImages = (images) => {
    return {
        type: RETRIEVE_SERVICE_PROVIDER_IMAGES,
        images
    }
}
export const retrieveVideos = (vidoes) => {
    return {
        type: RETRIEVE_SERVICE_PROVIDER_VIDEOS,
        vidoes
    }
}