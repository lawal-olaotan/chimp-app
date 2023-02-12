
export type User = {
  name: string
  email: string
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

export type Contact = {
  email:string,
  name:string,
  status:string,
}


export type AuthEnabledPage <P = unknown> = P &{
  requiresAuthentication?:true
}

