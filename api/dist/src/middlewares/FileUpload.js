"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("@src/util/errors/ApiError");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/gif"
];
function configureFileDetails(file, folder) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path_1.default.extname(file.originalname);
    file.path = `images/${folder}${uniqueSuffix}${ext}`;
    file.filename = `https://cardapiozin.s3.sa-east-1.amazonaws.com/${file.path}`;
    file.originalname = `${uniqueSuffix}${ext}`;
}
const multerConfig = (folder) => {
    return (0, multer_1.default)({
        limits: { fileSize: 3 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                configureFileDetails(file, folder);
                cb(null, true);
            }
            else {
                return cb(new ApiError_1.UnprocessableError("Invalid file type. Allowed types are: " + ALLOWED_MIME_TYPES.join(", ")));
            }
        }
    });
};
const handleMulterError = (err, next) => {
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return next(new ApiError_1.UnprocessableError("File is too large. Maximum allowed size is 3 MB."));
        }
    }
    else if (err instanceof ApiError_1.UnprocessableError) {
        return next(err);
    }
    return next(new ApiError_1.BadRequestError("An error occurred while uploading the file."));
};
const verifyFile = (folder) => {
    const upload = multerConfig(folder);
    return (req, res, next) => {
        upload.single("file")(req, res, (err) => {
            if (err)
                return handleMulterError(err, next);
            if (!req.file)
                return next();
            next();
        });
    };
};
exports.default = verifyFile;
//# sourceMappingURL=FileUpload.js.map