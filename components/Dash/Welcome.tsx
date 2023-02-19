
import { useEffect, useContext} from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@components/Layout';
import {sessionContext} from '../../utils/sessionContext'; 
import { Subscription } from './Subscriptions'
import { FreeTrials } from './FreeTrials';
import { Deals } from './Deals';


export const Welcome = ()=> {
    const {data:session,status} = useSession({required:true});
    const {setSessionData, sessionData} = useContext(sessionContext)

    
        useEffect(()=>{
            setSessionData(session.user);
        },[session.user])

        return(
            <div className='relative'>
                    <Layout>
                        <div className="w-full flex flex-col h-[94%]">
                                    <div className="section-layout py-12">
                                        <div className='mb-8'>
                                            <h2 className='font-semibold mb-2'>welcome {sessionData?.name}</h2>
                                            <p className='font-medium mb-4 text-sm'>Let track your subscriptions and free trials.</p>
                                            <span className='font-medium mb-4 text-sm'>You can manually track your Free trials and link your accounts to detect your subscriptions.</span>
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
