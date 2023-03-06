import {NextApiRequest, NextApiResponse} from 'next'; 
import { Server } from 'socket.io';
import {handleTransactionWebhook} from '../../webhooks/handleTransactions'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    
      const {webbook_type:webhookType} = req.body; 
      const io = new Server();
      const type = webhookType.toLowerCase(); 

      const webhookMap = {
        transactions:handleTransactionWebhook
      }

      const webhookHandler = webhookMap[type];
      webhookHandler(req.body, io); 
      res.json({status:'ok'})
  
    
}
