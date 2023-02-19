import React, {
    useCallback,
    useMemo,
    useReducer,
    createContext,
    useContext,
  } from 'react';
import {api} from './api'
import {TokenAction, LinkTokenContext, initialState} from '@interfaces/link';

const LinkContext = createContext<LinkTokenContext>(
    initialState as LinkTokenContext
)

/**
 * @desc Maintains plaid token in application context state
  */ 
export const LinkTokenProvider = (props:any) => {

    const [tokens, dispatch] = useReducer(reducer, initialState); 

    const createToken = useCallback(async(userToken:number, itemToken:number|null)=> {

      const tokenData = {
        userId:userToken,
        itemId:null
      }
        const token = await api('/create-link','POST', tokenData); 

        if(token){
          if(itemToken!== null){
            dispatch({
              type:'TOKEN_UPDATE_MODE',
              id: itemToken, 
              token: token,
            })
          }else{
            dispatch({
              type:'TOKEN_CREATED',
              id: userToken, 
              token: token,
            })
          }

        }else{
          dispatch({
            type:'TOKEN_ERROR',
            error: token.data
          })

        }

       

    
    },[])

     const deleteToken = useCallback(async(userId:number, itemId:number|null) => {
          if(userId !== null ){
            dispatch({
              type:'DELETE_USER_TOKEN',
              id: userId, 
            })
          }else{
            dispatch({
              type:'DELETE_ITEM_TOKEN',
              id: itemId, 
            })
          }

     }, [])

    const value = useMemo(
      () => ({
        createToken,
        deleteToken,
        tokens
      }), [tokens,createToken, deleteToken]
    )

  return <LinkContext.Provider value={value} {...props}/>
}

/**
 * @description updated token state as inidcated by dispatched actions
 */

const reducer = (state: any, action: TokenAction) => {

    switch (action.type) {
      case 'TOKEN_CREATED':
        return {
          ...state,
          userToken:{
            [action.id]: action.token
          } ,
          error:{}
        }
      case 'TOKEN_UPDATE_MODE':
        return {
          ...state,
          itemToken:{
            ...state.itemToken,
            [action.id]: action.token
          } ,
          error:{}
        }
      case 'DELETE_USER_TOKEN':
        return {
          ...state,
          userToken:{
            [action.id]: '',
        }
      }
      case 'DELETE_ITEM_TOKEN':
        return {
          ...state,
          itemToken: {
            ...state.itemToken,
            [action.id]: '',
          },
        };
      case 'TOKEN_ERROR': 
      return {
        ...state,
        error: action.error,
      };
      default:
        return state
    }
  

}

export default function useTokenLink(){

    const context = useContext(LinkContext)
    if (context === undefined) {
      throw new Error(`useTokenLink must be used within a LinkTokenProvider`)
    }
    return context
}