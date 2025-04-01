import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = process.env.AWS_BUCKET_NAME || '';

    this.s3 = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  public async uploadImage(file: Express.Multer.File): Promise<void> {
    const params = {
      Bucket: this.bucket,
      Key: file.path,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  public async deleteImage(fileKey: string): Promise<void> {
    const index = fileKey.indexOf("/images");
    const params = {
      Bucket: this.bucket,
      Key: fileKey.slice(index + 1),
    };
      const command = new DeleteObjectCommand(params);
      await this.s3.send(command);
  }
}
