import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class FileUploadService {
  async uploadFile(file): Promise<any> {
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    const upload = new Upload({
      client: new S3Client({
        credentials: {
          accessKeyId: 'AKIAU6GD2SDOTBZVGVHA',
          secretAccessKey: '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',
        },
        region: 'eu-north-1',
      }),
      params: {
        Bucket: 'assets.anco.ac',
        Key: Date.now() + file.originalname,
        Body: stream,
        ACL: 'public-read',
        ContentType: file.mimetype,
      },
    });

    try {
      const data = await upload.done();
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
