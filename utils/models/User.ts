import { ObjectId} from 'mongoose';

export type userDetails =  {
    email: string,
    name: string,
    emailVerified?: Date,
    _id?:ObjectId
  
}

