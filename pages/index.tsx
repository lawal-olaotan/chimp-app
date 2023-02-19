
import { Welcome } from '@components/Dash/Welcome';
import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'



 const IndexPage :AuthEnabledPage<NextPage> = () => {
  return (
     <Welcome/>

  )
}

IndexPage.requiresAuthentication = true;
export default IndexPage;







