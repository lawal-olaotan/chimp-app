import * as e6p from "es6-promise";
(e6p as any).polyfill();
import * as fetch from "isomorphic-unfetch";


export const brandFetchApi = async(name:string)=> {
    const response =  await fetch.default('https://api.brandfetch.io/v2/search/'+name, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BRANDFETCH_API}`
            },
            method:'GET'
    })
    const brands = await response.json();
    const brandName = name.split(" ").length > 0 ? name.split(" ")[0] : name;
    const matchedbrand = await brands.filter((brand:any) => brand.name == brandName || brand.name.split(' ')[0] === brandName)[0]; 
    return matchedbrand;
} 










    


    





