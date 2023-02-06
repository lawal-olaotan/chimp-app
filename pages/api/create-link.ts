import type { NextApiResponse, NextApiRequest } from "next";
import { plaidClient } from "utils/plaid";
import {Products, CountryCode} from 'plaid'


export default async function handler(req:NextApiRequest, res:NextApiResponse)
{

try{
	// create plaid token 
		const getToken = await plaidClient.linkTokenCreate({
			user:{client_user_id:'d/9ooYEXBGoo9bY+5efs1nDCXex3'},
			client_name:"chimp-tracker",
			language:'en',
			products:[Products.Auth, Products.Transactions],
			country_codes:[CountryCode.Gb],
			redirect_uri:process.env.PLAID_URI
		})

		return res.json(getToken.data.link_token)

}catch(error){
	console.error(error);
	 res.status(500).json({
			message:"server error"
	})
}
    
}