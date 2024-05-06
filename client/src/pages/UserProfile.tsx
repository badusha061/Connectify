import Layouts from '@/Layouts/Layouts'
import useUserStore from '@/app/Store'
import useFetch from '@/hooks/useFetch'


function UserProfile() {
    const userDetails : {} | null = useUserStore((user) => user.user)
    const userId  = userDetails?.id 
    console.log(userId)
    const [data] = useFetch(userId)
    console.log(data)
  return (
    <Layouts>
        <div>UserProfile</div>
    </Layouts>
  )
}

export default UserProfile