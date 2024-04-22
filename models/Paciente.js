import mongoose from "mongoose";

const paciente = new mongoose.Schema({
    nome: String,
    cpf: String,
    dataNascimento: String,
})

export default paciente