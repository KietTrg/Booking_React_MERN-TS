import React, { useContext, useState } from "react"
import { useQuery } from "react-query"
// import Toast from "../components/Toast"
import * as apiClient from '../api'
// type ToastMessage = {
//     message: string,
//     type: "SUCCESS" | "ERROR"
// }
type AppContext = {
    // showToast: (toastMessage: ToastMessage) => void
    isLogin: boolean
}
const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({children}:{children: React.ReactNode}) => {
    // const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    const {isError} = useQuery('validateToken', apiClient.validateToken,{
        retry: false
    })
    return(
        <AppContext.Provider value={
            {
            // showToast: (toastMessage) => {
            //     setToast(toastMessage)
            // },
            isLogin: !isError
        }
        }>
            {/* {toast && (<Toast message={toast.message} type={toast.type} onclose={()=>setToast(undefined)}/>)} */}
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext
}