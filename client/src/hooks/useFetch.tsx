import axios from 'axios';
import  { useEffect, useState } from 'react'
import { UserData} from '../types/database'



function useFetch(userId : number) {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [data , setData] = useState<UserData | null>(null);


  useEffect(() => {
      GetUser()
  },[])

  const GetUser =  async () => {
    try{
      const response  =  await axios.get<UserData>(`${BASE_URL}/api/profile/${userId}/`)
      setData(response.data)      
    }catch(error : any){
      console.log(error)
    }
   
  }

  return [data]
}

export default useFetch