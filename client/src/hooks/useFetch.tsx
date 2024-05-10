import  { useEffect, useState } from 'react'
import { UserData} from '../types/database'
import axiosInstance from '@/service/interceptor';



function useFetch(userId : number) {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  

  const [data , setData] = useState<UserData | null>(null);


  useEffect(() => {
      GetUser()
  },[])

  const GetUser =  async () => {
    try{
      const response  =  await axiosInstance.get<UserData>(`/api/profile/${userId}/`)
      setData(response.data)      
    }catch(error : any){
      console.log(error.message)
    }
   
  }

  return [data]
}

export default useFetch