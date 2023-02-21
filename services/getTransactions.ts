import {plaidClient} from "../utils/plaid"
import {getItembyId} from '../pages/api/item'


const fetchTransaction = async(itemId:string  )=> {

    // get last cursor from DB
    const {accessToken, lastCursor} = await getItembyId(itemId)

    let added = [], modified = [], removed = [], hasMore:boolean = true; 
    const batchSize = 100; 

    let cursor:string= lastCursor; 

  try{

    while(hasMore){

        const request = {
            access_token:accessToken,
            cursor:cursor,
            count:batchSize
        }

        const response = await plaidClient.transactionsSync(request); 
        const data = response.data;

        added = added.concat(data.added)
        modified = modified.concat(data.modified)
        removed = removed.concat(data.removed)
        hasMore = data.has_more;
        cursor = data.next_cursor;
    }
  }catch(error){
    console.error(`Error fetching transactions:${error.message}`); 
    cursor = lastCursor
  }
  return {added, modified, removed,cursor, accessToken}
}

const getAccountIds = async (accessToken:string) => {
    const request = {
        access_token:accessToken
    }
    const response = await plaidClient.accountsGet(request); 
    const data = response.data; 
    const accountIds = data.accounts.map((account:any) => account.account_id); 
    return {accountIds}
}

export const updateTransactions = async(itemId:string) => {
   const { added, modified, removed, cursor, accessToken} = await fetchTransaction(itemId); 
   const {accountIds} = await getAccountIds(accessToken)

    // get recurring transactions
    const request = {
        access_token:accessToken,
        account_ids:accountIds
    }
    
    const response = await plaidClient.transactionsRecurringGet(request); 
    const recurringExpenses = response.data.outflow_streams;
    
    // save to db 
    // update item to db 
    // save recurring payment 
    // save transactions
    
    

}


// TODO: get merchants logo and website from Db or fetch from brand ApI; 
// TODO: check merchant website emission 
