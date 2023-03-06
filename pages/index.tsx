import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'
import { useEffect, useState} from 'react';
import {api} from 'services/api';
import {useRouter} from 'next/router'; 
import Layout from '@components/Layout';



 const IndexPage :AuthEnabledPage<NextPage> = () => {

    const [connect, setConnect] = useState<any>(0);
    const router = useRouter();

    useEffect(()=>{

        fetch('/api/item?type=multiple').then(data => data.json())
        .then((data) => {
            setConnect(data.length)
            if(data.length === 0) 
            router.replace('/welcome')
        })

    },[])
   
  return (
    <>
    {  connect > 0 ? 
    <Layout>
    <div> welcome</div> 
    </Layout>: null

    }
    </>
  )
}

IndexPage.requiresAuthentication = true;
export default IndexPage;