import multer from "multer";

const storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(undefined, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(undefined, new Date().toISOString() + file.originalname);
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
