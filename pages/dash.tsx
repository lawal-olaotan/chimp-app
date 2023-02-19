import { plaidClient, sessionOptions } from 'utils/plaid';
import { withIronSessionSsr } from 'iron-session/next';
import type { TransactionsGetRequest } from 'plaid';
import Layout from '../components/Layout'


export default function Dash(){

    return(
        <Layout title="Welcome | Chimp Tracker">
        <div>connected</div>
        </Layout>
    )

}

