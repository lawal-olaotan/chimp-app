import React,{FC, useState} from 'react'; 
import { ChildrenProps } from 'interfaces';
 
interface profileEvent {
    modalStatus: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const profileContext = React.createContext<Partial<profileEvent>>({});

const   ProfileProvider:FC<ChildrenProps> = ({children}) => {
    
        const [modalStatus,setModalStatus] = useState<boolean>(false)
    
        return(
            <profileContext.Provider value={{modalStatus,setModalStatus}}>
                {children}
            </profileContext.Provider>
        )
}

export {profileContext,ProfileProvider}