import {
    usePlaidLink,
    PlaidLinkOnSuccessMetadata,
    PlaidLinkOnExitMetadata,
    PlaidLinkError,
    PlaidLinkOptionsWithLinkToken,
    PlaidLinkOnEventMetadata,
    PlaidLinkStableEvent,
} from 'react-plaid-link';
import { useEffect, useCallback} from 'react';
import {exchangeToken} from '@services/api'; 
import { useRouter } from "next/router";
import useTokenLink from 'services/link'

interface Props {
    token: string, 
    userId: number
    itemId?: number | null
    children?: React.ReactNode
}


export default function Connect(props:Props){

        const router = useRouter();
        const {createToken, deleteLinkToken} = useTokenLink(); 

         // react callback function that takes user unique ID and returns a public key
         const onSuccess = useCallback(async (
            publicToken:string,
            metadata: PlaidLinkOnSuccessMetadata
            )=>{

            if(props.itemId !== null)
            {
                // setItem State
                // delete link token - done; 
                // get token by byItemId

            }else{

                await exchangeToken({ 
                    publicToken: publicToken, 
                    institutionId: metadata.institution.institution_id,
                    accounts:metadata.accounts,
                })

                // getItemsByUser using sessionId
                
            }
            // deleteLinkToken
            router.replace('/dash')
            
        },[])


        const config:PlaidLinkOptionsWithLinkToken = {
            onSuccess, 
            token: props.token,
        }

        // called when users clicks connect bank button and calls usePlaidLink 
        // using response from onSuccess and token as parameters 
        const { open,ready } = usePlaidLink(config)

        useEffect(()=> {
            if(ready){
                open(); 
            }

        }, [ready, open, props.userId, props.itemId,props.token])
        

    return <></>

}