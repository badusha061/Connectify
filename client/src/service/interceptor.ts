import axios from "axios";
import Cookies from 'js-cookie';


const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const accessToken = Cookies.get('tokenAccess')
const refershToken = Cookies.get('tokenRefresh')
console.log('access for bearer before',accessToken)
const axiosInstance  =  axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Authorization':`Bearer ${accessToken}`
  }
})


axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if(error.response && error.response.status === 401){
      try{
        const response = await  axios.post(`${BASE_URL}/api/token/refersh`,{refresh : refershToken})
        console.log(response.data.access,'access')
        Cookies.set('tokenAccess', response.data.access, { expires: 7, secure: true });
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
      }catch(error){
        console.log(error)
      }

    }
    return Promise.reject(error)
  }
)

export default axiosInstance