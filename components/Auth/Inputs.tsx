import { NextPage } from "next";
import React from "react";  

interface InputsProps{
    InputType:string
    inputRef:React.RefObject<HTMLInputElement>
    placeholder:string
}

export const Inputs:NextPage<InputsProps> = ({InputType,inputRef,placeholder})=>{
    return(
        <input className="mt-3 p-3 border-solid border border-grey rounded-lg w-full" type={InputType} ref={inputRef} placeholder={placeholder} required/>
    )
}