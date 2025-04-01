"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class S3Service {
    constructor() {
        this.bucket = process.env.AWS_BUCKET_NAME || '';
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }
    async uploadImage(file) {
        const params = {
            Bucket: this.bucket,
            Key: file.path,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await this.s3.send(command);
    }
    async deleteImage(fileKey) {
        const index = fileKey.indexOf("/images");
        const params = {
            Bucket: this.bucket,
            Key: fileKey.slice(index + 1),
        };
        const command = new client_s3_1.DeleteObjectCommand(params);
        await this.s3.send(command);
    }
}
exports.S3Service = S3Service;
//# sourceMappingURL=S3Service.js.map