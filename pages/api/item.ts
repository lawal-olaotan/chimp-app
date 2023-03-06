import type { NextApiResponse, NextApiRequest} from "next";
import { plaidClient} from "utils/plaid";
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"; 
import type { ItemType } from "interfaces";
import {ActivateDb} from "utils/mongoDB";
import { updateTransactions} from "../../services/getTransactions";
import { Server } from 'socket.io';

type ItemQuery = {
    itemId:string;
    type:string
}

export default async function handler (req:NextApiRequest, res:NextApiResponse){

    const session = await getServerSession(req,res, authOptions);
    const db = await ActivateDb(); 
    if(req.method === 'POST'){
        try{
            const io = new Server();
            const {public_token, institutionId} = req.body; 
    
            // TODO: Implement toast for client.
            const isItemCreated = await db.collection('items').findOne({
                $and:[
                    {userId:session.user._id},
                    {institutionId:institutionId}
                ]
            })
    
            if(isItemCreated){
                return res.status(409).json({
                    message:"item already created"
                })
            }
    
            const plaidResponse = await plaidClient.itemPublicTokenExchange({
               public_token:public_token, 
            })
    
            // return access_token and item id or save to DB =
            let accessToken = plaidResponse.data.access_token; 
            let itemId = plaidResponse.data.item_id
    
            const newItem:ItemType = {
                userId:session.user._id,
                itemId:itemId,
                accessToken:accessToken,
                institutionId:institutionId,
                timestamp: (new Date().toString()), 
                status: 'good',
                lastCursor:''
    
            }
             const items = await db.collection('items').insertOne(newItem); 
        
            
            // get transactions 
            // get recurring transactions 
            await updateTransactions(itemId, institutionId).then(()=>{
                io.emit('NEW_TRANSACTIONS_DATA', {itemId:newItem.itemId})
            });

            // get institution Id
           
            
            res.status(200).json(items); 
    
        }catch(error){
            console.error(error);
            return res.status(500).json({
                message:"server error"
            })
        }
    }else if (req.method === 'GET'){
        try{
           
            const query = req.query; 
            if(query.type === 'multiple'){
                 let userItems = await db.collection('items').find({userId:session.user._id}).toArray()
                 res.status(200).send(userItems);
            }else{
                 await getItembyId(query.id.toString())
                res.status(200).send(true)
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({
                message:"server error"
            })
        }
    }
    
}

// get user user Item information using itemId
export const getItembyId = async(itemId:string) => {

    const db = await ActivateDb(); 

    try{
        const itembyId = await db.collection('items').findOne({itemId:itemId});
        return itembyId;
    }catch(error){
        console.error(`Error fetching item by id:${error.message}`)
    }
}

export const updateItemCursor = async(itemId:string, cursor:string) => {
    try{
        const db = await ActivateDb();
        await db.collection('items').findOneAndUpdate({itemId: itemId},{$set:{lastCursor:cursor}}); 
    }catch(error){
        console.error(`Error updating item by id:${error.message}`)
    }
}