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
    const db = await ActivateDb(); 

    await expenses.map(async (expense:any)=> {
        const subs = {
            account_id: expense.account_id,
            amount: expense.last_amount,
            frequency:expense.frequency, 
            category: expense.category[0],
            subCategory: expense.category[1],
            isActive: expense.is_active,
            merchantName: expense.merchant_name,
            userId: userId
        }
        newSubscriptions.push(subs)
    })

    try{
        if(newSubscriptions.length >  1 ){
            await db.collection('recurring').insertMany(newSubscriptions);
            
        }else{
            await db.collection('recurring').insertOne(newSubscriptions[0]);
        }

    }catch(error){
        console.error(`error saving recurring transactions: ${error}`)
    }
}