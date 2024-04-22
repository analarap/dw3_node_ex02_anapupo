import express from "express";

const app = express()

import mongoose from "mongoose";

import PacienteController from "./controllers/PacienteController.js"
import ConsultaController from "./controllers/ConsultaController.js"

app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/consultas")

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use("/", PacienteController)
app.use("/", ConsultaController)

app.get("/",function(req,res){
    res.render("index")
})

app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})