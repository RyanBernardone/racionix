const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ""

        if(req.baseUrl.includes("tutor")){
            folder = "tutor"
        }else if (req.baseUrl.includes("kid")){
            folder = "kid"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie apenas imagens JPG ou PNG!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }