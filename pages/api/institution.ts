import { NextApiRequest, NextApiResponse } from "next";
import {ActivateDb} from "utils/mongoDB";

// export default async function handler(res:NextApiResponse,req:NextApiRequest){
// }

export const getInsById = async(ins:string) => {

    const db = await ActivateDb();
    const insById = await db.collection('institutions').findOne({
        institution_id:ins
    })
    
    if(!insById || insById == null) return true
    
}

export const saveIns = async (data:any) => {
    const db = await ActivateDb();
    const ins = await db.collection('institutions').insertOne(data);
    return true;
}; 

export const saveBrands = async (data:any) => 
{
    const db = await ActivateDb();
    if(data.length > 1) db.collection('brands').insertMany(data);
     await db.collection('brands').insertOne(data);
    return true;
}

