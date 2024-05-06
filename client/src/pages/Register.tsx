import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {z} from 'zod'
import { passwordRegex  } from "@/Regex/Regex"
import axios from "axios";
import Layouts from "@/Layouts/Layouts"

const SignUpSchema = z.object({
    username : z
            .string()
            .min(3,{
                message:"username must be atleast 3 charcacter"
            })
            .max(20,{
                message:"Username cannot be more than 20 character"
            }),

    password1 : z
            .string()
            .min(5,{
                message:"Password must contain 5 character"
            })
            .max(20,{
                message:"Password Not contain More than 20"
            })
            .refine(value => passwordRegex.test(value),{
                message:"passwod must be strong"
            }),
    password2 : z 
            .string()
            .refine(value => passwordRegex.test(value), {
              message: "Password Must be strong"
            })
}).refine(data => data.password1 === data.password2, {
  message: "Passwor do not match",
  path:["password2"]
})

type FormField = z.infer<typeof SignUpSchema>


export default function Register() {

    const navigate = useNavigate()
  
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


    const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
        username: "",
      },
      mode: "onTouched"
    })

    const {isSubmitting} = form.formState



    const onSubmit = async (values : z.infer<typeof SignUpSchema>) => {
        try{

            const response = await  axios.post(`${BASE_URL}/api/user/`,values)
            if(response.status === 201){
              console.log('register')
              navigate('/login')
            }
        }catch(error){
          console.log(error)
        }
    }


  return (
    <Layouts>

    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create free
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
                <Input placeholder="Enter your Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conform password</FormLabel>
              <FormControl>
                <Input placeholder="Conform your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isSubmitting ? (
            "isLoading"
          ):(
            "Submit"
          )}
        </Button>
      </form>
    </Form>
       

          <div className="mt-4 text-center text-sm">
            Already have account?{" "}
            <Link to="/login" className="underline">
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
