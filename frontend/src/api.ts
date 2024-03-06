import {RegisterFormData} from './page/Register'
import { SignInFormData } from './page/SignIn';

const APT_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const register = async(formData: RegisterFormData)=>{
    const response = await fetch(`${APT_BASE_URL}/api/users/register`,{
        credentials:'include',
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}
export const signIn = async(formData: SignInFormData) =>{
    const response = await fetch(`${APT_BASE_URL}/api/auth/login`,{
        credentials: 'include',
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if(!response.ok){
    throw new Error(responseBody.message)
}
return responseBody
}
export const validateToken = async ()=>{
    const response = await fetch(`${APT_BASE_URL}/api/auth/validate-token`,{
        credentials: 'include'
    })
    if(!response.ok){
        throw new Error('Token invalid')
    }
    return response.json()
}
export const signOut = async () => {
    const res = await fetch(`${APT_BASE_URL}/api/auth/logout`,{
        credentials: 'include',
        method: 'POST'
    })
    if(!res.ok){
        throw new Error("Error during sign out")
    }
    
}