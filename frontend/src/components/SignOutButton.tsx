// import React from 'react'
import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const SignOutButton = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const mutation = useMutation(api.signOut, {
        onSuccess: async() => {
            await queryClient.invalidateQueries('validateToken')
            toast.success('Log Out success')
            navigate('/sign-in')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    const handleClick = () => {
        mutation.mutate()
    }
  return (
    <button onClick={handleClick} className="text-white px-3 font-bold hover:bg-gray-100 hover:text-black transition-all duration-300">Sign Out</button>        

  )
}

export default SignOutButton