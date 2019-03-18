import multer from "multer";
const DIR = "uploads/";
const storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(undefined, DIR);
    },
    filename: function (req, file, cb) {
        cb(undefined, "image" + "-" + new Date().toISOString());
    }
});
const limits = { fileSize: 1024 * 1024 * 5};

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
        cb(undefined, true);
    } else {
        cb(new Error("Image type not accepted, please upload jpeg or png."), false);
    }
};

export const upload = multer(
    {
        storage: storage,
        limits: limits,
        fileFilter: fileFilter
    });

export default upload ;
