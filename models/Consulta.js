import mongoose from "mongoose";

const consulta = new mongoose.Schema({
    paciente: String,
    data: String,
    horario: String,
    especialista: String,
    medico: String
})

export default consulta