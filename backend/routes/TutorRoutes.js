const router = require('express').Router()
const TutorController = require('../controllers/TutorController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', TutorController.register)
router.post('/login', TutorController.login)
router.get('/checktutor', TutorController.checkTutor)
router.get('/:id', TutorController.getTutorByID)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), TutorController.editTutor)

module.exports = router