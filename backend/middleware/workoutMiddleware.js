const multer = require('multer')

// Multer stuff
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, ',./images')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storage}).single('picture')

module.exports = { upload }