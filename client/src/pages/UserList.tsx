import  { useEffect, useState } from 'react'
import { UserData } from '@/types/database';
import useUserStore from '@/app/Store';
import axiosInstance from '@/service/interceptor';


function UserList() {
  const UserDetails = useUserStore((user) => user.user)
  const [users , setUsers] = useState<UserData>()

  useEffect(() => {
    FetchAllUser()
  },[UserDetails])

  const FetchAllUser = async ()  =>  {
    try{
      const response = await axiosInstance.get(`/api/all/${UserDetails?.id}`)
      setUsers(response.data)
    }catch(error : any){
      console.log(error.message)
    }
  }
  let total_count : number
  if(users){
      total_count = Object.keys(users).length;
  }


  return (
    
    <>
            <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>

            {total_count ? (
              <span
                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                > {total_count} </span>
            ): null}
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
  

        {users ? (
          <>
          {users.map((user  : string, index : number) => (
            <button
            key={index}
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full"
                >
                J
              </div>
              <div className="ml-2 text-sm font-semibold"> {user.user?.username} </div>
            </button>
          ))}
        </>
        ):null}
          </div>
  

        </div>
    </>
  )
}

export default UserList