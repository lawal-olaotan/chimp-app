import type { NextApiResponse, NextApiRequest } from "next";
import { plaidClient} from "utils/plaid";
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"; 
import type { ItemType } from "interfaces";
import ClientPromise from "utils/mongoDB";
import { updateTransactions } from "../../services/getTransactions";



export default async function handler (req:NextApiRequest, res:NextApiResponse){
    
    try{
        const db = (await ClientPromise).db();
        const session = await getServerSession(req,res, authOptions);

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
            status: 'good'
        }
         const items = await db.collection('items').insertOne(newItem); 
    
         res.status(200).json(items); 

        // get transactions 
        // get recurring transactions 
        await updateTransactions(itemId);

    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"server error"
        })
    }
}


// get user user Item information using itemId
export const getItembyId = async(itemId:string) => {

    const db = (await ClientPromise).db();

    try{
        const itembyId = await db.collection('items').findOne({itemId:itemId});
        return itembyId;
    }catch(error){
        console.error(`Error fetching item by id:${error.message}`)
    }
}