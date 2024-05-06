import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { NavLink } from "react-router-dom";
import { CircleUserRound } from 'lucide-react';
import { ChevronRight } from "lucide-react"
import { BotMessageSquare } from "lucide-react"
import { Menu } from "lucide-react"
import { useState } from 'react';
import useUserStore from '@/app/Store';
 

function Navbar() {
    const userDetails : {} | null = useUserStore((user) => user.user)
    const [isMenu , setIsMenu] = useState<boolean>(false)
    const userId: number | null = userDetails?.id;
    const toggleMenu = () => {
        setIsMenu(!isMenu)
    }
  return (
        <>
            

<nav className="bg-white  max-auto  border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <Button className=' md:hidden ' onClick={toggleMenu} >
            <Menu />
        </Button>
    <div className={`flex md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse `}>
    {userDetails ? (
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <NavLink  
                 to='/chatboat' 
                 style={({ isActive }) => {
                    return isActive ? { color: "blue" } : {};
                }}
                 >
                <li className=' flex cursor-pointer ' >
                    <BotMessageSquare size={30}  />
                </li>
                </NavLink>
                <NavLink
                style={({ isActive }) => {
                    return isActive ? { color: "blue" } : {};
                }}
                to={`/user/${userId}`}>
                <li className=' flex mt-2 cursor-pointer '>
                        <CircleUserRound size={30}  />
                </li>   
                </NavLink>
                
                <li className=' flex ' >
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-3 w-3" />
                    </Button>
                </li>
    
            </ul>
    ):(
        <>
        <div className=' flex ' >
            <Button asChild>
                <NavLink to="/login">Login</NavLink>
            </Button>
        </div>
        <div>
        <Button asChild>
            <NavLink to="/register">Register</NavLink>
        </Button>
        </div>
        </>
    )}


    </div>
  </div>
</nav>

        </>

  )
}

export default Navbar