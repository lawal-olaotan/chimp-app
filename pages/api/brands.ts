import { ActivateDb } from "utils/mongoDB";
import { brandFetchApi } from "./externals";

// function to find and create new merchants assets
export async function findAndCreateMerchants(merchants) {
    const db = await ActivateDb();
    try {
        await Promise.all(merchants.map(async merchant => {
            const isbrandSaved = await db.collection('brands').findOne({ name: merchant });
            if (!isbrandSaved) {
                let brandsRes = await brandFetchApi(merchant);
                if(!brandsRes){
                   brandsRes = {
                        name:merchant,
                        domain:'',
                        icon:''
                   } 
                }
                const data = {
                    name:merchant,
                    domain:brandsRes?.domain,
                    logo:brandsRes?.icon,

                }
                await db.collection('brands').insertOne(data)
            }
        })
        )
    } catch (error) {
        console.error(error)
    }

}
