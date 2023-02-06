import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  endpoint: 's3.eu-west-3.amazonaws.com',
  region:'eu-west-3'
});

export const getS3ImageUrl = async (imageKey: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: imageKey,
  };

  console.log(params);

  const signedUrl = await s3.getSignedUrlPromise('getObject', params);

  return signedUrl;
};