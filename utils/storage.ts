import { Client } from 'minio';

const minioClient = new Client({
  endPoint: process.env.MINIO_IP || '',
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_PORT === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

minioClient.setRequestOptions({ rejectUnauthorized: false });

export const uploadMusic = (filePath: string, name: string) => {
  return new Promise((resolve, reject) => {
    const meta = {
      'Content-Type': 'audio/mp3',
    };
    minioClient.fPutObject(
      process.env.MINIO_BUCKET_NAME || '',
      name,
      filePath,
      meta,
      (err, objInfo) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(objInfo);
      }
    );
  });
};

export const isMusicExist = (name: string) => {
  return new Promise((resolve) => {
    minioClient.getObjectTagging(
      process.env.MINIO_BUCKET_NAME || '',
      name,
      function (err, tagsList) {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      }
    );
  });
};
