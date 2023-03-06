
import { Welcome } from '@components/Dash/Welcome';
import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'
import { useEffect, useState} from 'react';
import useTokenLink from 'services/link';
import Connect from '@components/plaid/Connect';
import useItems from 'services/items'; 
import {api} from 'services/api';


 const WelcomePage :AuthEnabledPage<NextPage> = () => {

   

  return (
 <Welcome/>
  )
}

WelcomePage.requiresAuthentication = true;
export default WelcomePage;







