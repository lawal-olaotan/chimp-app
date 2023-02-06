import { NextPage } from "next";

interface ButtonProps{
    value:string
}

export const Button:NextPage<ButtonProps> = ({value})=>{

    return(
    
            <input className="rounded-lg mt-8 bg-primary p-3.5 w-full text-white flex items-center justify-center" type="submit" value={value } />
        
    )
}