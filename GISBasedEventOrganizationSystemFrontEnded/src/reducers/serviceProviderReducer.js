import {
    UPDATE_SERVICE_PROVIDER, UPDATE_SERVICE_PROVIDER_HALLS, UPDATE_SERVICE_PROVIDER_DECORATORS,
    UPDATE_SERVICE_PROVIDER_MUSICIAN
} from "../actions/serviceProviderAction";
const provider = {
    serviceProviderMc: {}
};

const providerHall = []
// const providerDecorators = []
// const providerMuscian = []



export default function serviceProviderReducer(state = provider, action) {
    switch (action.type) {
        case UPDATE_SERVICE_PROVIDER:
            return (
                Object.assign({}, state, { serviceProviderMc: action.provider })

            )


            break;
        // case UPDATE_SERVICE_PROVIDER_HALLS:
        //     return (
        //         providerHall.push({ providerHall: action.provider })
        //     )
        //     break;
        // case UPDATE_SERVICE_PROVIDER_DECORATORS:
        //     return (
        //         providerDecorators.push({ providerDecorators: action.provider })
        //     )
        //     break;
        // case UPDATE_SERVICE_PROVIDER_MUSICIAN:
        //     return (
        //         providerMuscian.push({ providerMuscian: action.provider })
        //     )
        //     break;
        default:
            return state;
    }
}

