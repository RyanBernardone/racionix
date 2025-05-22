const Kid = require('../models/Kid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class KidController {
  static async register(req, res) {
    const { name, age } = req.body

    const image = req.file
    // Validação
    if (!name) {
      res.status(422).json({ message: 'O nome da criança é obrigatório!' })
      return
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else if (age >= 18) {
      res.status(422).json({ message: 'A criança precisa ser menor de 18 anos' })
      return
    }

    if (!image) {
      res.status(422).json({ message: 'Insira uma foto da criança.' })
      return
    }

    //Checa existencia da crianca
    const kidExists = await Kid.findOne({name: name})
      if (kidExists){
        res.status(422).json({message: 'Essa criança já está cadastrada!'})
        return
    }

    // Obter tutor a partir do token
    const token = getToken(req)
    const tutor = await getUserByToken(token)

    if (!tutor) {
      res.status(401).json({ message: 'Acesso negado!' })
      return
    }

    // Criação da criança vinculada ao tutor
    const kid = new Kid({
        name: name,
        age: age,
        image: image.filename,
        tutor: tutor._id
    })

    try {
        const newKid = await kid.save()
        res.status(201).json({message: 'Criança cadastrada com sucesso!', newKid})
    } catch (error) {
        res.status(500).json({message: error})
    }
  }

  static async getKid(req, res){

    const token = getToken(req)
    const tutor = await getUserByToken(token)

    const kids = await Kid.find({ 'tutor': tutor._id}).sort({"name": 1})

    res.status(200).json({kids: kids})
  }

  static async getKidById(req, res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      res.status(422).json({message: 'ID inválido!'})
      return
    }

    const kid = await Kid.findOne({_id: id})
    if (!kid){
      res.status(404).json({message: 'Criança não encontrada!'})
      return
    }

    res.status(200).json({kid: kid})
  }

  static async removeKidById(req, res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      res.status(422).json({message: 'ID inválido!'})
      return
    }

    const kid = await Kid.findOne({_id: id})
    if (!kid){
      res.status(404).json({message: 'Criança não encontrada!'})
      return
    }

    //checar se tutor logado registrou essa criança
    const token = getToken(req)
    const tutors = await getUserByToken(token)

    if(kid.tutor.toString() !== tutors._id.toString()){
      res.status(422).json({message: 'Você não é o tutor dessa criança!'})
      return
    }

    await Kid.findByIdAndDelete(id)
    res.status(200).json({message: 'Criança removida com sucesso!'})
  }

  static async updateKid(req, res){
    const id = req.params.id
    const { name, age } = req.body
    const image = req.file

    const updatedData =  {}

    //checa se criança existe
    const kid = await Kid.findOne({_id: id})

    if (!kid){
      res.status(404).json({message: 'Criança não encontrada!'})
      return
    }

    //checar se tutor logado registrou essa criança
    const token = getToken(req)
    const tutors = await getUserByToken(token)

    if(kid.tutor.toString() !== tutors._id.toString()){
      res.status(422).json({message: 'Você não é o tutor dessa criança!'})
      return
    }

    if (!name) {
      res.status(422).json({ message: 'O nome da criança é obrigatório!' })
      return
    }else {
      updatedData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else if (age >= 18) {
      res.status(422).json({ message: 'A criança precisa ser menor de 18 anos' })
      return
    }else {
      updatedData.age = age
    }

    if (image) {
      updatedData.image = image.filename
    }

    await Kid.findByIdAndUpdate(id, updatedData)
    res.status(200).json({message: 'Criança atualizada com sucesso!'})
  }
}
