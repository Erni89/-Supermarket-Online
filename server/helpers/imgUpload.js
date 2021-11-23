const multer = require('multer')
const path = require('path')

const fs = require('fs')
const request = require('request')

const storage = multer.diskStorage({
    destination: './imgUpload',
    filename: (req, file, cb) => {
        // + path.extname(file.originalname)
        cb(null, file.originalname )
        
    }
})

// Init upload
const upload = multer(
    {
    storage,
    fileFilter: (req, file, cb) => {
    
        checkFileType(file, cb)
    }
}).single('file')


// file type? 
function checkFileType(file, cb) {
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const download = (url, filename, callback) => {
    request.head(url, function (err, res, body) {
        try {
            request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
        } catch (err) {
            console.log("err", err)
        }
    });
};

module.exports = {
    upload,
    download
}