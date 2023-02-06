import React from  'react'
import { getS3ImageUrl} from '../../utils/s3'
import { ImageProps, S3ImageProps} from "../../interfaces"
import Image from  'next/image'


const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
    return <Image fill={true} object-fit="contain" src={src} alt={alt} />;
};


export const  S3Image: React.FC<S3ImageProps> = ({ imageKey,alt }) => {
    const [imageUrl, setImageUrl] = React.useState('');
  
    React.useEffect(() => {
      (async () => {
        const url = await getS3ImageUrl(imageKey);
        setImageUrl(url);
      })();
    }, [imageKey]);
  
    return <ImageComponent src={imageUrl} alt={alt}/>;
  };