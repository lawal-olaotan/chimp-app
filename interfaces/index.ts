
export type User = {
  id: number
  name: string
}

export interface ImageProps {
  src: string;
  alt:string
}

export interface S3ImageProps {
  imageKey: string;
  alt:string 
}


declare module "iron-session" {
  interface IronSessionData {
    accessToken?:string
    itemId?:string
}}


export type Layout = {
  children?: React.ReactNode
  title?: string
}