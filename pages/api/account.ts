import {ActivateDb} from "utils/mongoDB";
import type {NextApiRequest, NextApiResponse} from 'next';


export const createAccounts = async (accounts:any,itemId:string, userId:string)=> {
    const db = await ActivateDb();
    const RefinedAccounts = []
    await accounts.map(async (account:any)=> {
        const newAccount = {
            account_id: account.account_id,
            mask: account.mask,
            name: account.name,
            official_name: account.official_name,
            subtype: account.subtype,
            type: account.type,
            userId: userId,
            itemId: itemId
        }
        RefinedAccounts.push(newAccount);
    })

    try{
        if(RefinedAccounts.length > 1){
            await db.collection('accounts').insertMany(RefinedAccounts);
        }else{
            await db.collection('accounts').insertOne(RefinedAccounts[0]);
        }
    }catch(error){
        console.error(error)
    }
}