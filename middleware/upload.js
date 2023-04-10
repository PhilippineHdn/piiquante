const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(['jpeg','jpg','png'].find(ext => file.mimetype.includes(ext))) {
        cb(null, true);
    } else{
        cb(null, false);
    }
};

let upload = multer({storage, fileFilter});

module.exports = upload.single('image');
