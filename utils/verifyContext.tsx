import React,{FC, useState} from 'react'; 
import { ChildrenProps } from 'interfaces';


interface emailSentStatus{
    isEmailSent:boolean;
    setEmailSentStatus:React.Dispatch<React.SetStateAction<boolean>>
}

const verificationContext = React.createContext<Partial<emailSentStatus>>({}); 

const VerificationProvider:FC<ChildrenProps> = ({children}) => {


    const [isEmailSent,setEmailSentStatus] = useState<boolean>(true)

    return(
        <verificationContext.Provider value={{isEmailSent,setEmailSentStatus}}>
            {children}
        </verificationContext.Provider>
    )
}

export {verificationContext,VerificationProvider}


