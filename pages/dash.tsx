import { plaidClient, sessionOptions } from 'utils/plaid';
import { withIronSessionSsr } from 'iron-session/next';
import { Create } from '@components/Dash/Create';
import type { TransactionsGetRequest } from 'plaid';
import Layout from '../components/Layout'




export default function Dash({transactions}){

    return(
        <Layout title="Welcome | Chimp Tracker">
        <div>connected</div>
        </Layout>
    )

}


export const getServerSideProps = withIronSessionSsr(
  
    async function getServerSideProps({req}){
  
      const accessToken = req.session.accessToken
      console.log(accessToken);
  
      // get current date 
      const currentDate = new Date().toISOString().replace(/T.*/,'')
  
  
      const EstimateStartDate = ()=>{
        let date = new Date()
        date.setDate(1)
        date.setMonth(date.getMonth() - 4)
        let calcDate = date.toISOString().replace(/T.*/,'') 
        return calcDate;
      }
      
    
      // get first data in the last four month 
  
      const request: TransactionsGetRequest = {
          access_token:accessToken,
          start_date: EstimateStartDate(),
          end_date: currentDate,
      }
  
      if (!accessToken) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      // get transactions 
      // get brands logo 
      const transactions = await plaidClient.transactionsGet(request)
      const recurring = await plaidClient.transactionsRecurringGet({
        access_token:accessToken,
        account_ids:['xM9q4jMDBjurZLlPRm7DUwRolXqK3wHJXV71w']
      })
      console.log(recurring.data.outflow_streams);
      return {
        props:{
          balance:transactions.data
        }
      }
  
  }, sessionOptions); 