import { NextApiRequest, NextApiResponse } from "next";
import ClientPromise from "utils/mongoDB";

export default async (req: NextApiRequest, res:NextApiResponse) => {

    try{
        const {_id} = req.body;
        const db = (await ClientPromise).db();

        // const collections = ['users', 'sessions']

        // TODO: use job queue infastructure (bull MQ) upon deleting user information
        const isUserDeleted = db.collection('users').deleteOne({userId:_id})
        if(isUserDeleted){
            res.status(200).json({
                message:"user deleted"
              })
        }else{
            res.status(500).json({
                message:"server error"
              })
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"server error"
          })
    }
}