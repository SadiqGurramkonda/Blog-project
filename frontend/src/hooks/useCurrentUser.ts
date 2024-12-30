import { useState } from "react"

export const useCurrentUser = (userData:any)=>{
    const [currentUser, setCurrentUser] = useState(userData);
     
}