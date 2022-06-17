import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
aws.config.loadFromPath(__dirname + "../../../aws.config.json");

export const SingleMultipartData = () => {
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
      const s3 = new aws.S3();
      const upload = multer({
        storage: multerS3({
          //@ts-ignore
          s3,
          bucket: "dsm-reims",
          acl: "public-read",
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: (req, file, cb) => cb(null, req.user!.id as unknown as string),
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
