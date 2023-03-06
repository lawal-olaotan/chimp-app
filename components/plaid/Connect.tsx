import {
    usePlaidLink,
    PlaidLinkOnSuccessMetadata,
    PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link';
import { useEffect, useCallback} from 'react';
import {exchangeToken} from '@services/api'; 
import { useRouter } from "next/router";
import useTokenLink from 'services/link';
import useItems from 'services/items'; 

interface Props {
    token: string, 
    userId: number
    itemId?: string | null
    children?: React.ReactNode
}


export default function Connect(props:Props){

        const router = useRouter();
        const {deleteToken} = useTokenLink()
        const {getItemsByUser, getItemsById} = useItems()
        

         // react callback function that takes user unique ID and returns a public key
         const onSuccess = useCallback(async (
            publicToken:string,
            metadata: PlaidLinkOnSuccessMetadata
            )=>{

            if(props.itemId !== null)
            {
                // setItem State
                deleteToken(props.userId, props.itemId)
                getItemsById(props.itemId)

            }else{

                await exchangeToken({ 
                    publicToken: publicToken, 
                    institutionId: metadata.institution.institution_id,
                    accounts:metadata.accounts,
                })

                await getItemsByUser();
                
            }
            deleteToken(props.userId,null);
            router.push('/')
            // deleteLinkToken
            
        },[])

        // const onExit = async(
        //     error: Error,
        //     metadata: PlaidLinkOnSuccessMetadata
        // )=> {
        //    if(error != null && error.cause === 'INVALID_LINK_TOKEN'){
        //     await createToken(props.userId, props.itemId)
        //    }
        // }


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

        }, [ready,props.userId, props.itemId])
        

    return <></>

}