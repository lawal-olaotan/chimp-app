import { PlaidLinkError } from "react-plaid-link"


export interface LinkToken {
    [key:string] : string
}

export interface TokenState {
    userToken: LinkToken, 
    itemToken: LinkToken, 
    error:PlaidLinkError
}

export type TokenAction = 
| {
    type: 'TOKEN_CREATED';
    id : number;
    token: string;
  }
| { type: 'TOKEN_UPDATE_MODE'; id : number; token: string }
| { type: 'TOKEN_ERROR'; error: PlaidLinkError }
| { type: 'DELETE_USER_TOKEN';  id : number; }
| { type: 'DELETE_ITEM_TOKEN';  id : number; };

export interface LinkTokenContext extends TokenState {
    dispatch: React.Dispatch<TokenAction>;  
    createToken: (userId:number, itemId: number | null |undefined ) => void;
    deleteLinkToken: (userId:number, itemId: number | null |undefined ) => void;
    tokens:TokenState
}

export const initialState = {
    userToken:{},
    itemToken:{},
    error:{}
}