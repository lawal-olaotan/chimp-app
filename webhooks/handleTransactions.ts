import getItembyId from '../pages/api/item'; 
import{ updateTransactions }from '../services/getTransactions'

export const handleTransactionWebhook = async (requestBody, io) =>{

    const { webhook_code: webhookCode,
        item_id: itemId}= requestBody; 
        
    
    if(webhookCode)io.emit(webhookCode, {itemId}); 

    switch(webhookCode){
        case 'HISTORICAL_UPDATE':
            const {recurring, added} = await updateTransactions(itemId);
            console.log(`Transactions: ${added}, recurring:${recurring}`);
            break;
        case 'DEFAULT_UPDATE':
        case 'INITIAL_UPDATE':
        break;
        default:
    }
}