import {plaidClient} from "../utils/plaid"
import {getItembyId, updateItemCursor} from '../pages/api/item'; 
import { saveTransactions, saveRecurringTransactions, deleteTransactions } from "pages/api/transactions";
import { createAccounts } from "pages/api/account";
import {getInsById, saveIns, saveBrands} from 'pages/api/institution'
import {InstitutionsGetByIdRequest, CountryCode} from 'plaid'; 
import { brandFetchApi} from "pages/api/externals";
import { findAndCreateMerchants} from "pages/api/brands";



const fetchTransaction = async(itemId:string)=> {

    // get last cursor from DB
    const {accessToken,userId} = await getItembyId(itemId)
  try{

        const request = {
            access_token:accessToken,
            start_date:'2023-01-01',
            end_date:'2023-03-01',
        }

        const response = await plaidClient.transactionsGet(request); 
        const data = response.data;
        const transactions = data.transactions;
        const totalTransactions = data.total_transactions
        return {accessToken,userId,transactions, totalTransactions}
        
  }catch(error){
    console.error(`Error fetching transactions:${error.message}`); 
  }
  
}

const getAccountIds = async (accessToken:string,userId:string) => {
    const request = {
        access_token:accessToken
    }
    const response = await plaidClient.accountsGet(request); 
    const data = response.data; 
    const accountIds = data.accounts.map((account:any) => account.account_id); 
    await createAccounts(data.accounts, data.item.item_id, userId);
    return {accountIds}
}
    
export const updateTransactions = async(itemId:string, institutionId:string) => {                            
   const { accessToken,userId, transactions,totalTransactions} = await fetchTransaction(itemId); 
   const {accountIds} = await getAccountIds(accessToken,userId)

    // get recurring transactions
    const request = {
        access_token:accessToken,
        account_ids:accountIds
    }
    
    const response = await plaidClient.transactionsRecurringGet(request); 
    const recurringExpenses = response.data.outflow_streams;
     const brandsAssets = await saveRecurringTransactions(recurringExpenses,userId); 

    await findAndCreateMerchants(brandsAssets);
    await institution(institutionId); 
    await updateItemCursor(itemId, ''); 
    await saveTransactions(transactions,userId)
    await deleteTransactions('');
    
    return {
      recurring:recurringExpenses.length,
      added:totalTransactions
     
    }

  
}

export const createIns = async (insId:string)=> {
  const request: InstitutionsGetByIdRequest = {
    institution_id:insId,
    country_codes: [CountryCode.Gb],
  }
  const response = await plaidClient.institutionsGetById(request);
  const {name} = response.data.institution; 
   const brandProps =   await brandFetchApi(name);
   const newIns = {
    name:name,
    domain:brandProps.domain,
    logo:brandProps.icon,
    insId: insId
   }
  await saveIns(newIns)
  return true;

}

export const institution = async (insId:string)=> {
   const notCreated = await getInsById(insId); 
    if(notCreated) await createIns(insId)
}


