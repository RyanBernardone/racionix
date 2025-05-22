const router = require('express').Router()
const KidController = require('../controllers/KidController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', verifyToken, imageUpload.single('image'), KidController.register)
router.get('/criancas', verifyToken, KidController.getKid)
router.get('/:id', KidController.getKidById)
router.delete('/:id', verifyToken, KidController.removeKidById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), KidController.updateKid)

module.exports = router