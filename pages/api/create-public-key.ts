import type { NextApiResponse, NextApiRequest } from "next";
import { plaidClient, sessionOptions } from "utils/plaid";
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(getPublicToken,sessionOptions,)


async function getPublicToken(req:NextApiRequest, res:NextApiResponse){
    
    try{
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
           public_token:req.body.public_token 
        })
        req.session.accessToken = plaidResponse.data.access_token; 
        req.session.itemId = plaidResponse.data.item_id
        await req.session.save();
        res.send({ok:true});

    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"server error"
        })
      }
}