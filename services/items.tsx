import React, {useCallback, useContext, useMemo, useRef, useReducer,createContext} from 'react';
import type {ItemType} from '@interfaces/index'; 
import {api} from '@services/api';
import {keyBy} from 'lodash/keyBy'


interface ItemsState{
    [itemId:number]: ItemType[]; 
}

const initialState : ItemsState = {}; 
type ItemsAction = |{type:'SUCCESSFUL_REQUEST'; payload:ItemType[]}
    | {type:'FAILED_REQUEST'; payload:ItemType}
    | {type:'DELETED_BY_USER'; payload:ItemType}

interface ItemsContextShape extends ItemsState {
    dispatch: React.Dispatch<ItemsAction>;
    getItemsByUser: () => void;
    getItemsById: (id:string) => void; 
    itemsById: {[itemId:number]:ItemType[]};
    itemsByUsers:{[itemId:number]:ItemType[]}; 
}

const ItemsContext = createContext<ItemsContextShape>( initialState as ItemsContextShape); 

export function ItemProvider(props:any){

    const [itemsByUsers,dispatch] = useReducer(reducer,initialState);


    const getItemsByUser = useCallback(async()=> {
            const {data:payload} = await api('/item?type=multiple', 'GET'); 
            dispatch({type:'SUCCESSFUL_REQUEST', payload: payload})
    },[])

    const getitemById = useCallback(async(id:string)=> {
        const {data:payload} = await api(`/item?type=single&id=${id}`, 'GET'); 
        dispatch({type:'SUCCESSFUL_REQUEST', payload: payload}) 
    },[])

    const value = useMemo(()=> {
        return {
            getItemsByUser,
            itemsByUsers, 
            getitemById
        };
    }, [getItemsByUser,itemsByUsers, getitemById])

    return <ItemsContext.Provider value={value} {...props}/>
}

function reducer(state:ItemsState, action:ItemsAction){
    switch(action.type){
        case 'SUCCESSFUL_REQUEST': {
            if(!action.payload?.length){
                return state; 
            }
            return {...state, ...keyBy(action.payload,'itemId')};
        }
       default:
        console.warn('unknown action')
        return state
    }
}

export default function useItems()
{
    const context = useContext(ItemsContext); 
    if(!context){  
        throw new Error('useItems must be used within an ItemsProvider')
     }

     return context
}