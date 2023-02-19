import React,{FC, useState} from 'react';
import {userDetails,ChildrenProps} from '../interfaces'

interface sessionProps{
    sessionData:userDetails
    setSessionData: React.Dispatch<React.SetStateAction<userDetails>>
}

const sessionContext = React.createContext<Partial<sessionProps>>({}); 

const SessionDataProvider:FC<ChildrenProps> = ({children}) => {

    const [sessionData,setSessionData] = useState<userDetails>()

    return(
        <sessionContext.Provider value={{sessionData,setSessionData}}>
            {children}
        </sessionContext.Provider>
    )
}

export {sessionContext, SessionDataProvider}
