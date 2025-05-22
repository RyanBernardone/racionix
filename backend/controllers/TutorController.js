const Tutor = require('../models/Tutor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require('../helpers/get-token')
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class TutorController{
    static async register(req, res){
        const { name, email, password, age, confirmpassword } = req.body

        //validar
        if (!name){
            res.status(422).json({message: 'O campo Nome é obrigatório'})
            return
        }

        if (!email){
            res.status(422).json({message: 'O campo E-mail é obrigatório'})
            return
        }

        if (!password){
            res.status(422).json({message: 'O campo Senha é obrigatório'})
            return
        }

        if(!age){
            res.status(422).json({message: 'A idade é obrigatória!'})
            return
        }else if(age < 18){
            res.status(422).json({message: 'O tutor precisa ser maior de idade'})
            return
        }

        if (!confirmpassword){
            res.status(422).json({message: 'O campo Confirmar Senha é obrigatório'})
            return
        }

        if (password !== confirmpassword){
            res.status(422).json({message: 'As senhas precisam ser identicas'})
            return
        }

        //checar existencia do tutor
        const tutorExists = await Tutor.findOne({email: email})
        if (tutorExists){
            res.status(422).json({message: 'Já existe um tutor cadastrado com esse e-mail!'})
            return
        }

        //criptografar senhas
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const tutor = new Tutor({
            name: name,
            email: email,
            age: age,
            password: passwordHash,
        })

        try {
            const newTutor = await tutor.save()
            await createUserToken(newTutor, req, res)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    
    static async login(req, res){
        const {email, password} = req.body

        if (!email){
            res.status(422).json({message: 'O campo E-mail é obrigatório'})
            return
        }

        if (!password){
            res.status(422).json({message: 'O campo Senha é obrigatório'})
            return
        }

        const tutor = await Tutor.findOne({email: email})
        if (!tutor){
            res.status(422).json({message: 'Não há usuários cadastrados com esse e-mail!'})
            return
        }

        //check senha 
        const checkPassword = await bcrypt.compare(password, tutor.password)
        if (!checkPassword){
            res.status(422).json({message: 'Senha inválida!'})
            return
        }

        await createUserToken(tutor, req, res)
    }

    static async checkTutor(req, res){
        let currentTutor
        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'meusecret')
            currentTutor = await Tutor.findById(decoded.id)
            currentTutor.password = undefined
        }else{
            currentTutor = null
        }

        res.status(200).send(currentTutor)
    }

    static async getTutorByID(req, res){
        const id = req.params.id
        const tutor = await Tutor.findById(id).select("-password")
        if (!tutor){
            res.status(422).json({message: 'Tutor não encontrado!'})
            return
        }

        res.status(200).json({tutor})
    }

    static async editTutor(req, res){
        const id = req.params.id

        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, password, age, confirmpassword } = req.body

        let image = ''
        if (req.file){
            user.image = req.file.filename
        }

        //validar
        if (!name){
            res.status(422).json({message: 'O campo Nome é obrigatório'})
            return
        }

        user.name = name

        if (!email){
            res.status(422).json({message: 'O campo E-mail é obrigatório'})
            return
        }

        const tutorExists = await Tutor.findOne({email: email})

        if (user.email !== email && tutorExists){
            res.status(422).json({message: 'Tutor não encontrado!'})
            return
        }

        user.email = email

        if(!age){
            res.status(422).json({message: 'A idade é obrigatória!'})
            return
        }else if(age < 18){
            res.status(422).json({message: 'O tutor precisa ser maior de idade'})
            return
        }

        user.age = age

        if (password !== confirmpassword){
            res.status(422).json({message: 'As senhas precisam ser identicas'})
            return
        }else if (password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            await Tutor.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true},
            )

            res.status(200).json({message: 'Usuário atualizado com sucesso!'})

        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }
}