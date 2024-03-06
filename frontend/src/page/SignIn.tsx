import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as api from '../api'
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData ={
    email: string;
    password: string;
}

const SignIn = ()=>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {register, handleSubmit, formState:{errors}}=useForm<SignInFormData>()
    const mutation = useMutation(api.signIn, {
        onSuccess: async ()=>{ 
            toast.success("Login success")
            await queryClient.invalidateQueries('validateToken')
            navigate('/')},
        onError:(error: Error)=>{
            toast.error(error.message)
        }
    })
    const onSubmit = handleSubmit((data)=>  {
       mutation.mutate(data)

    })
    return(
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Login</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">Email
            <input 
            className="border rounded-md w-full py-1 px-2 font-normal" 
            {...register("email",{required:"This field is required"})} 
            type="email"  />
            {errors.email && (
                <span className="text-xs text-red-600 font-normal italic">{errors.email.message}</span>
             )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">Password
            <input 
            className="border rounded-md w-full py-1 px-2 font-normal" 
            {...register("password",
            {required:"This field is required",
            minLength: {
                value: 6,
                message: 'Password must be at least 6 character'
            }
        })} 
            type="password"  />
            {errors.password && (
                <span className="text-xs text-red-600 font-normal italic">{errors.password.message}</span>
             )}
            </label>
            
            <span className="flex justify-between items-center">
                <span className="text-sm text-gray-500">No account ? <Link className="hover:text-black" to={'/register'} >Create an account here</Link></span>
                <button type="submit" className="bg-black text-white py-2 px-6 font-bold hover:bg-transparent hover:border-2 hover:border-black transition-all duration-300 hover:text-black">Login</button>
            </span>   
        </form>
        
    )
}
export default SignIn