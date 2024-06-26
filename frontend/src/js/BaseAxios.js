import axios from "axios";
const { VITE_VUE_API_URL, VITE_ELECTRIC_CHARGING_STATION_URL } = import.meta.env;

function localaxios(){
const instance = axios.create({
    baseURL:VUE_API_URL,
    params:{
        apiKey:"",
    },
    //withCredentials:true,
    //응답을 아래 형식으로 받음
    headers:{
        "Content-Type": "application/json;charset=utf-8",
    }
})
instance.defaults.headers.common["Authorization"]="";
instance.defaults.headers.post["Content-Type"]="application/json";
instance.defaults.headers.put["Content-Type"]="appication/json"
return instance;
}
function statusaxios(){
    const instance = axios.create({
        baseURL:VITE_ELECTRIC_CHARGING_STATION_URL,
        headers:{
            "Content-Type": "application/json;charset=utf-8",
        }
    })
    return instance;
    }
export{localaxios,statusaxios};