
import { useEffect, useContext, useState} from 'react';
import {getSession } from 'next-auth/react';
import Layout from '@components/Layout';
import {sessionContext} from '../../utils/sessionContext'; 
import { Subscription } from './Subscriptions'
import { FreeTrials } from './FreeTrials';
import { Deals } from './Deals';
import useItems from '../../services/items'



export const Welcome = ()=> {
    const {getItemsByUser,itemsByUsers } = useItems();
    const [userName, SetUserName] = useState<string>()
    const {setSessionData, sessionData} = useContext(sessionContext)

    useEffect(()=>{
        getSession().then(session => {
            if(session){
                getItemsByUser()
                SetUserName(session.user.name)
                setSessionData(session.user)
            }
        })
    },[itemsByUsers])



        return(
            <div className='relative'>
                    <Layout>
                            <div className="w-full flex flex-col h-[94%]">
                                <div className="section-layout py-12">
                                    <div className='mb-8'>
                                        <h2 className='font-semibold mb-2'>welcome {userName}</h2>
                                        <p className='font-medium mb-4 text-sm'>Let track your subscriptions and free trials.</p>
                                        <span className='font-medium mb-4 text-sm'>You can track your Free trials and link your accounts to detect your subscriptions.</span>
                                    </div>
                                    <div className='w-full h-4/5 flex self-center'>
                                            <div className='flex flex-wrap items-center space-between'>
                                                <Subscription/>
                                                <FreeTrials/>
                                                <Deals/>
                                            </div>
                                    </div>
                                </div>
                            </div>  
                    </Layout> 
            </div>
        )
}
