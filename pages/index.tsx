
import { Create } from '@components/Dash/Create';
import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'



 const IndexPage :AuthEnabledPage<NextPage> = () => {
  return (
     <Create/>
  )
}

IndexPage.requiresAuthentication = true;
export default IndexPage;







