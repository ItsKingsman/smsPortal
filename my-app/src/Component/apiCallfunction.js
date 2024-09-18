async function apiCallFunction(path,extra={}){
    var res = await fetch(path,extra);
    var value = await res.json();
    return value;
}
export default apiCallFunction;

// async function apiCallFunction(path,method,data){
//     console.log("function called");
//     console.log(path,method,data);
//     console.log(process.env.REACT_APP_SMSAPI);
// }