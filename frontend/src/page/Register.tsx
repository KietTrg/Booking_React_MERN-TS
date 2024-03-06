import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as api from '../api'
// import { useAppContext } from "../contexts/AppContext";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
// const {showToast} = useAppContext()
 const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>()
 const mutation = useMutation(api.register,
    {
    onSuccess:async () => {
        
        toast.success("Register success")
        await queryClient.invalidateQueries('validateToken')
        navigate('/')
        // showToast({message: "Register success",type: "SUCCESS"})
    },
    onError: (error: Error)=>{
        toast.error(error.message)
    //    showToast({message: error.message,type:"ERROR"})

    }
 }
 )

 const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data)
 })
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Register</h2>
        <div className="flex flex-col md:flex-row gap-5 ">
            <label className="text-gray-700 text-sm font-bold flex-1">First Name
            <input
             className="border rounded-md w-full py-1 px-2 font-normal" 
             {...register("firstName",{required:"This field is required"})} 
             type="text"  />
             {errors.firstName && (
                <span className="text-xs text-red-600 font-normal italic">{errors.firstName.message}</span>
             )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">Last Name
            <input 
            className="border rounded-md w-full py-1 px-2 font-normal" 
            {...register("lastName",{required:"This field is required"})} 
            type="text"  />
            {errors.lastName && (
                <span className="text-xs text-red-600 font-normal italic">{errors.lastName.message}</span>
             )}
            </label>
        </div>
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
            <label className="text-gray-700 text-sm font-bold flex-1">Confirm Password
            <input 
            className="border rounded-md w-full py-1 px-2 font-normal" 
            {...register("confirmPassword",{
                validate:(value)=>{
                    if(!value){
                        return "This field is require"
                    } else if (watch("password") !== value){
                        return "Your password do no match"
                    }
                }
            })} 
            type="password"  />
            {errors.confirmPassword && (
                <span className="text-xs text-red-600 font-normal italic">{errors.confirmPassword.message}</span>
             )}
            </label>
            <span>
                <button type="submit" className="bg-black text-white p-2 font-bold hover:bg-transparent hover:border-2 hover:border-black transition-all duration-300 hover:text-black">Create Account</button>
            </span>
    </form>
  )
}

export default Register