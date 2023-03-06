import { useEffect, useState, useContext} from 'react';
import { WelcomeImages } from './WelcomeImages';
import {sessionContext} from '../../utils/sessionContext';
import useTokenLink from 'services/link';
import Connect from '@components/plaid/Connect'
import useItems from '../../services/items'
import {api} from '../../services/api'

export const Subscription = ()=> {

    const [token,setToken] = useState<any>('');
    const [userId, setUserId] = useState<any>()
    const {sessionData} = useContext(sessionContext); 
    const {createToken, tokens} = useTokenLink();
    const {getItemsByUser, itemsByUsers} = useItems()

   

    useEffect(()=> {
        setToken(tokens.userToken[userId])
    }, [tokens])

    const initiateLink = async ()=>{
        // retrieving user id from session value; 
        const id =  sessionData?._id.toString().split("");
        const numReg = /^[0-9][A-Za-z0-9 -]*$/  
	    const isStringNumber = (x:any) => numReg.test(x)  ? true : false;
        const seperateNum = [...id].reduce((x:any,y:any) => isStringNumber(y) ? x+y : x, ""); 
        setUserId(seperateNum); 
        createToken(seperateNum, null);
	}

   

    return (
        <>
            <button onClick={()=>{initiateLink()}} >
                <WelcomeImages imagePath='/subs.png' imageAlt='subscriptions' imageText='Detect Subscriptions'/>       
            </button>

            {token !== '' ? <Connect itemId={null} token={token} userId={userId}/> : null}
        </>
      

    )
}