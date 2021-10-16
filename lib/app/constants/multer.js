"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // for folder name
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/json" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    }
    else {
        cb(new Error("supported types jpg/jpeg, png, pdf, docx and video/mp4"), false);
    }
};
exports.upload = (0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter });
//# sourceMappingURL=multer.js.map