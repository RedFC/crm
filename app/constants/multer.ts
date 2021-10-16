import Multer from "multer";

const fileStorage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // for folder name
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
        );
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"||
        file.mimetype === "video/mp4" ||
        file.mimetype === "application/pdf"  ||
        file.mimetype === "application/json" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"  
    ) {
        cb(null, true);
    } else {
        cb(new Error("supported types jpg/jpeg, png, pdf, docx and video/mp4"), false);

    }
};
export const upload = Multer({ storage: fileStorage, fileFilter: fileFilter });