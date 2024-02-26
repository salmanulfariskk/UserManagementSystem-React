import multer from 'multer';

const destinationPath = "../User-Management-api/public"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../User-Management-api/public");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage, storage });

export const uploadProfileImage = upload.single('profile');
