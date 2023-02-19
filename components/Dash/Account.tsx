import Layout from "../Layout";
import {Tab, Tabs,TabList, TabPanel} from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css'; 
import {useEffect, useState, useContext} from 'react';
import { sessionContext } from '../../utils/sessionContext';
import {userDetails } from '../../interfaces';
import Link from "next/link";
import { api } from "services/api";
import {ToastContainer, toast } from 'react-toastify'; 
import { useRouter } from "next/router";

export const Account = () => {

    const [profile, setProfile] = useState<userDetails>();
    const [joinedDate, setJoinedDate] = useState<string>();
    const {sessionData} = useContext(sessionContext);
    const router = useRouter();

    useEffect(()=>{
        setProfile(sessionData); 
        const userJoined = returnWhenUserJoined(sessionData);
        setJoinedDate(userJoined);
    },[sessionData])

    const returnWhenUserJoined = (sessionData:userDetails) => {
        const dataUserJoined = new Date(sessionData?.emailVerified); 
        const userJoined = `${dataUserJoined?.toISOString().split('T')[0]}`;
        return userJoined;
    }

    const deleteAccount = async() => {
         // TODO: upon user deleting account show user a form to understand decisions and get reviews
        const data = {
            id: sessionData?._id
        }

         const isUserDeleted = await api('/deleteUser','POST',data);
            if(!isUserDeleted){
                toast.error('Sorry, kindly try again', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else{
                router.push('/signup')
            }

    }

    return (
        <Layout>
            <div className="h-screen">
                <h1 className="text-3xl font-medium  m-4 ">Account</h1>
                <div className="p-4">
                    <Tabs>
                        <TabList>
                            <Tab>Profile</Tab>
                            <Tab>Billing</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="flex flex-col mt-8 pl-3">
                              <div>
                                <h4 className="text-base font-bold mb-2">Email</h4>
                                <div className="flex w-full"><p className="mr-2 text-base">{profile?.email}</p> <Link href="/contact" legacyBehavior><a className="text-xs bg-primary py-1 px-2 m-0 flex item-center text-white"> Change</a></Link></div>
                              </div>
                              <div className="mt-8">
                                <h4 className="text-base font-bold mb-2">Member Since</h4>
                               <p className="mr-2 text-base">{joinedDate}</p> 
                              </div>
                              <button onClick={deleteAccount} className="text-xs bg-red-700 p-2 text-white mt-8 w-fit">Delete Account</button>
                            </div>
                        </TabPanel>
                        <TabPanel> Billing information soon</TabPanel>
                    </Tabs>
                    
                </div>
                <ToastContainer />
            </div>
        </Layout>
    )
}