import { FetchTravellerData_FAILIOR, FetchTravellerData_SUCCESS, FetchTrevellerData_REQUEST } from "../ConstantType/Constant"


const initial_state = {
    loading_data:false,
    get_data:[],
    get_error:'',
}

export const reducer = (state = initial_state, action)=>{
    if(action.type===FetchTrevellerData_REQUEST){
        return {...state,loading_data:true}
    }else if(action.type===FetchTravellerData_SUCCESS){
        return {...state,loading_data:false,get_data:action.payload}
    }else if(action.type===FetchTravellerData_FAILIOR){
        return {...state,loading_data:false,get_error:action.payload}
    }
    else{
        return state;
    }
}