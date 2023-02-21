
import Layout from '../components/Layout'
import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'

const Dash:AuthEnabledPage<NextPage> = () => {

    return(
        <Layout title="Welcome | Chimp Tracker">
        <div>connected</div>
        </Layout>
    )

}

Dash.requiresAuthentication = true;
export default Dash;
