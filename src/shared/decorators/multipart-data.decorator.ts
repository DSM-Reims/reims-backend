import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';
aws.config.loadFromPath(path.join(__dirname, "../../../aws.config.json"));

export const SingleMultipartData = (isVideo?: boolean) => {
  return (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalFunction: Function = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const s3 = new aws.S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      });
      const upload = multer({
        storage: multerS3({
          //@ts-ignore
          s3,
          bucket: process.env.AWS_BUCKET_NAME!,
          acl: "public-read-write",
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: (req, file, cb) => cb(null, isVideo ? `${req.user!.name}-video` : req.user!.name),
        }),
      }).single("data");
      await new Promise((resolve, reject) => {
        upload(req, res, err => {
          if(err) reject(err);
          else resolve(req);
        });
      });
      return originalFunction.apply(this, [req, res, next]);
    };
    return descriptor;
  };
};
