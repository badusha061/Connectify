import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import useUserStore from '@/app/Store';
import {
    LogOut,
    CircleUserRound,
    ChevronDown,
    BotMessageSquare,
    Menu,
    User,
    MessageCircleMore
  } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import SucessSweet from '@/custom/SucessSweet';
import Cookies from 'js-cookie';
import { UserData } from '@/types/database';



function Navbar() {
    const userDetails : UserData  = useUserStore((user) => user.user)
    const removeUser = useUserStore((user) => user.removeUser)
    const [isMenu , setIsMenu] = useState<boolean>(false)
    const userId = userDetails?.id;
    const toggleMenu = () => {
        setIsMenu(!isMenu)
    }

    const handlogout = () => {
        removeUser()
        Cookies.remove('tokenRefresh')
        Cookies.remove('tokenAccess')
        const content = 'Successfully Logout'
        SucessSweet(content)
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
    
            <ul className="flex  justify-between font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                
                <NavLink 
                    to='/chat'
                    style={({ isActive }) => {
                        return isActive ? { color: "blue" } : {};
                    }}
                    >
                    <li>
                        <MessageCircleMore size={30}  />
                    </li>
                </NavLink>
                
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
                <li className=' flex  cursor-pointer '>
                        <CircleUserRound size={30}  />
                </li>   
                </NavLink>
                
                <li  className=' flex cursor-pointer ' >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ChevronDown />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            <NavLink to={`/user/${userId}`} >
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4 cursor-pointer " />
                                <span className=' cursor-pointer ' >Profile</span>
                            </DropdownMenuItem>
                            </NavLink>
                            </DropdownMenuGroup>
                            <DropdownMenuItem onClick={handlogout} >
                            <LogOut className="mr-2 h-4 w-4 cursor-pointer " />
                            <span className=' cursor-pointer ' >Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
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