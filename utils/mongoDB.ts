import  {MongoClient} from 'mongodb'; 

const URI= process.env.MONGO_URI;
const PORT = process.env.NEXTAUTH_URL


 const options:any = {}

 let client
 let ClientPromise:Promise<MongoClient>

 if(!process.env.MONGO_URI){
     throw new Error('Please add your mongo URI')
 }

 if(!PORT){
     client = new MongoClient(URI,options)
     ClientPromise = client.connect(); 
 }else{

    if(!global._MongoClientPromise){
        client = new MongoClient(URI,options); 
        global._mongoClientPromise = client.connect(); 
    }
    ClientPromise = global._mongoClientPromise
 }


export default ClientPromise