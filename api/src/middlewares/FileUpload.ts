import { BadRequestError, UnprocessableError } from "@src/util/errors/ApiError";
import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/gif"
];

function configureFileDetails(file: Express.Multer.File, folder: string) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  const ext = path.extname(file.originalname);
  file.path = `images/${folder}${uniqueSuffix}${ext}`;
  file.filename = `https://cardapiozin.s3.sa-east-1.amazonaws.com/${file.path}` 
  file.originalname = `${uniqueSuffix}${ext}`;
}

const multerConfig = (folder: string) => {
  return multer({
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        configureFileDetails(file, folder);
        cb(null, true);
      } else {
        return cb(new UnprocessableError("Invalid file type. Allowed types are: " + ALLOWED_MIME_TYPES.join(", ")));
      }
    }
  });
};

const handleMulterError = (err: any, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return next(new UnprocessableError("File is too large. Maximum allowed size is 3 MB."));
    }
  } else if (err instanceof UnprocessableError) {
    return next(err)
  }

  return next(new BadRequestError("An error occurred while uploading the file."));
};

const verifyFile = (folder: string) => {
  const upload = multerConfig(folder);

  return (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, (err) => {
      if (err) return handleMulterError(err, next);
      if(!req.file) return next();
      next();
    });
  };
};

export default verifyFile;
