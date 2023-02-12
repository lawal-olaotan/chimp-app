import { Document} from 'mongoose';

type userDetails =  {
    email: string,
    name: string,
    emailVerified?: Date
  
}

export interface UserSchema extends userDetails, Document{}

