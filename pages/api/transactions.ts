import type { NextApiRequest, NextApiResponse } from 'next'; 
import {ActivateDb} from "utils/mongoDB";
import { ObjectId } from 'mongodb';


export const saveTransactions = async (transactions:any,userId:ObjectId)=> {

    const db = await ActivateDb(); 
    const newTransactions = [];

     await transactions.map(async (transaction:any) => {

                const transactionData  = {
                    account_id: transaction.account_id,
                    account_owner: transaction.account_owner,
                    amount: transaction.amount,
                    category: transaction.category[0],
                    subcategory: transaction.category[1],
                    category_id: transaction.category_id,
                    authorized_date:transaction.authorized_date, 
                    name : transaction.name, 
                    merchant_name: transaction.merchant_name,
                    iso_currency_code: transaction.iso_currency_code,
                    transaction_id: transaction.transaction_id,
                    user_id: userId

                }

            newTransactions.push(transactionData);                                         
    })

    try{

        if(newTransactions.length >  1 ){
            await db.collection('transactions').insertMany(newTransactions);
            
        }else{
            await db.collection('transactions').insertOne(newTransactions[0]);
        }
        
    }catch(error){
            console.error(error)
    } 

}


export const saveRecurringTransactions = async(expenses:any,userId:ObjectId)=> {
    const newSubscriptions = []; 
    const brandsAssets =[]; 
    const db = await ActivateDb(); 

    await expenses.map(async (expense:any)=> {
        const subs = {
            account_id: expense.account_id,
            amount: expense.last_amount.amount,
            frequency:expense.frequency, 
            category: expense.category[0],
            subCategory: expense.category[1],
            isActive: expense.is_active,
            merchantName: expense.merchant_name,
            description: expense.description,
            userId: userId,
            lastDate: expense.last_date,
            status:expense.status
        }
        // check if asset is already created;
        brandsAssets.push(expense.description);
        newSubscriptions.push(subs)
    })

    try{
        if(newSubscriptions.length >  1 ){
            await db.collection('recurring').insertMany(newSubscriptions);
            
        }else{
            await db.collection('recurring').insertOne(newSubscriptions[0]);
        }

        return brandsAssets; 

    }catch(error){
        console.error(`error saving recurring transactions: ${error}`)
    }
}

export const deleteTransactions = async (removed:any) => {
    const db = await ActivateDb();
    if(removed.length > 1){
        const bulk = db.collection('transactions').initializeUnorderedBulkOp()
        bulk.find({'transaction_id':{$in:removed}}).delete(); 
        bulk.execute();
    }else if (removed.length !== 0){
        db.collection('transactions').deleteOne({transaction_id: removed[0].transaction_id})
    }

}