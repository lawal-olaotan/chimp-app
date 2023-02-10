import fsPromises from 'fs/promises';
import path from 'path'


export const FileFetcher = async ()=>  {
  const filePath = path.join('/anim', 'signup.json');
  const jsonData = await fsPromises.readFile(filePath);
    console.log(jsonData)
  
    return jsonData
}
