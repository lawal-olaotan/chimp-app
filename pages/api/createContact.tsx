import type {NextApiRequest, NextApiResponse} from 'next';
import * as e6p from "es6-promise";
(e6p as any).polyfill();
import * as fetch from "isomorphic-unfetch";

export default async function handler(req:NextApiRequest, res:NextApiResponse)
{   
    try{
        const {email, name, status} = req.body;

        const contact = {
            email_address:email,
            status:status, 
            merge_fields:{
                FNAME:name
            }
        }

        const mailChimpResponse = await fetch.default(`https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCEID}/members`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `apikey ${process.env.MAILCHIMP_APIKEY}`
            }, 
            body:JSON.stringify(contact)
        })

        // TODO: if mailchimp API fails, send notice to admin to perform manual addition of user to audience list
       if(mailChimpResponse.status >= 400){
           res.status(400).json({error: 'Something went wrong'});
       }
        return res.status(200).json({error:''}); 
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
  


}