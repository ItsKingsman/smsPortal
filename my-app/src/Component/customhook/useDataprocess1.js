import React,{useEffect,useState} from "react";
import apiCallFunction from "../apiCallfunction";;

function useDataprocess1(apiPath){
    // console.log('custom hook');
    // console.log(apiPath);
    var[data1,setData]=useState([]);
    useEffect(()=>{
        apiCallFunction(apiPath)
        .then(value=>{
            setData(value)
        })
    },[apiPath]);
    return data1;
}
export default useDataprocess1;