import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved, faBuildingColumns,faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import { useRouter } from 'next/router';

export const Create = ()=> {

    const [token,setToken] = useState<string>('');
    const router = useRouter();


        useEffect(()=>{
            createLinkToken()
        },[])

        // react callback function that takes user unique ID and returns a public key
        const onSuccess = useCallback(async (publicToken)=>{
            await fetch('/api/create-public-key',{
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ public_token: publicToken }),
            })
            router.push('/dash')
        },[])
        
        // function creates links token
        const createLinkToken = async()=>{

            const apiResponse = await fetch('/api/create-link',{
             method:'POST'
            })
            const apiToken  = await apiResponse.json();
            setToken(apiToken)
          
        }
        // called when users clicks connect bank button and calls usePlaidLink 
        // using response from onSuccess and token as parameters 
        const { open,ready } = usePlaidLink({
            token,
            onSuccess
        })

        return(
            <>
            <div className="w-full flex flex-col h-[94%]">
                        <div className="section-layout py-12">

                            <div className='mb-8'>
                                <h2 className='font-semibold mb-2'>Hi Lawal</h2>
                                <p className='font-medium mb-4 text-sm'>Link your accounts so we can detect your subscriptions and save you from paying for things you might not need.</p>
                                <span> <FontAwesomeIcon icon={faShieldHalved}/> <span className='font-bold'>CONNECT WITH OPEN BANKING</span></span>
                            </div>

                            <div className='w-full h-4/5 flex self-center'>
                                <button onClick={()=>{open()}} disabled={!ready} className='m-auto bg-primary text-white flex items-center justify-around py-3 px-12 rounded-lg'>
                                <div className='mr-4'><FontAwesomeIcon icon={faBuildingColumns}/> <span>Connect Accounts</span></div>
                                <FontAwesomeIcon className='text-lg' icon={faCirclePlus} />
                                </button>
                            </div>
                        </div>
            </div>
            </>
        )
}