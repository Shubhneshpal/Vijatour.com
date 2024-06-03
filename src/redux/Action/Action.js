import {FetchTrevellerData_REQUEST, FetchTravellerData_SUCCESS,FetchTravellerData_FAILIOR} from "../ConstantType/Constant"
import axios from "axios"

const FetchTravellerData_request = ()=>{
    return{type:FetchTrevellerData_REQUEST}
}
const FetchTravellerData_success = (data)=>{
    return{type:FetchTravellerData_SUCCESS,payload:data}
}
const FetchTravellerData_failior = (error)=>{
    return{type:FetchTravellerData_FAILIOR,payload:error}
}

export const fetch_data = ()=>{
    return (dispatch)=>{
        dispatch(FetchTravellerData_request())
        var p = axios.get('http://localhost:4000/api/getTraveller');
        p.then((response)=>{
            var data = response.data; 
            console.log(data);
            dispatch(FetchTravellerData_success(data))           
        },(error)=>{
            var err = error.massage
            dispatch(FetchTravellerData_failior(err)) 
        });
    }
}