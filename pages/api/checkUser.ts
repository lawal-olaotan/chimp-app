import { NextApiRequest, NextApiResponse } from "next";
import ClientPromise from "utils/mongoDB";
import { userDetails } from "interfaces";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const db = (await ClientPromise).db();
        if(req.method === 'GET'){
            const {email} = req.query;
            const users = await db.collection('users').findOne({email:email});
            return res.status(200).json(users);

        }else if(req.method ===  'POST'){
            const data:userDetails = req.body;
            const userdata = await db.collection('users').insertOne(data,); 
            return res.status(200).json(userdata);
        }

    }catch(error){
        console.error(error);
        res.status(500).json({
          message:"server error"
        })
    }
}