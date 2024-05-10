import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import Cookies from 'js-cookie';
import Layouts from "@/Layouts/Layouts"
import { jwtDecode } from "jwt-decode";
import useUserStore from "@/app/Store"
import {User , JWTData} from '../types/database'
import { passwordRegex } from "@/Regex/Regex"
import SucessSweet from "@/custom/SucessSweet"
import { Loader2 } from "lucide-react"


const formSchema = z.object({
  username: z.string()
            .min(3, {
            message: "Username must be at least 3 characters.",
            })
            .max(20, {
              message : "Username cannot be more than 20 characters"
            }),
  password: 
            z.string()
            .refine(data => passwordRegex.test(data),{
              message:"Password Must be strong"  
          })
})





export  default function Login() {
  const addUser = useUserStore((user) => user.addUser)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
    mode: "onTouched"
  })
  
  const {isSubmitting} = form.formState

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const  onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
          const response = await  axios.post(`${BASE_URL}/api/token`,values)
          if(response.status === 200){
            Cookies.set('tokenRefresh', response.data.refresh, { expires: 7, secure: true });
            Cookies.set('tokenAccess', response.data.access, { expires: 7, secure: true });
            const decodeData = jwtDecode<JWTData>(response.data.access)
            const user : User = {
              id : decodeData?.user_id,
              username : decodeData?.username
            }
            addUser(user)
            const content  = 'Succefully Login'
            SucessSweet(content)
            navigate('/')
            
          }
      }catch(error ){
        console.log(error)
      }
  }


  return (
    <Layouts>

    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"customise"} type="submit">
              {isSubmitting ? 
              <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Please wait
              </Button>
              : "Submit"}
            </Button>
          </form>
        </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to='/register' className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://unblast.com/wp-content/uploads/2020/05/Group-Chat-Illustration.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </Layouts>
  )
}
