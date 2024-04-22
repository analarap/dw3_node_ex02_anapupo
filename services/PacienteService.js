import mongoose from "mongoose";
import paciente from "../models/Paciente.js"

const Paciente = mongoose.model("Paciente", paciente)

class PacienteService{
    SelectAll() {
        const pacientes = Paciente.find()
        return pacientes
    }

    Create(nome, cpf, dataNascimento){
        const novoPaciente = new Paciente({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento
        })
        novoPaciente.save()
    }

    Delete(id){
        Paciente.findByIdAndDelete(id).then(() => {
            console.log(`Paciente com a id: ${id} foi deletado com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }

    SelectByCPF(cpf) {
        const paciente = Paciente.findOne({ cpf });
        return paciente;
    }

    SelectOne(id){
        const paciente = Paciente.findOne({_id : id})
        return paciente
    }

    Update(id, nome, cpf, dataNascimento){
        Paciente.findByIdAndUpdate(id, { 
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento
        }).then(() => {
            console.log(`Paciente com a id: ${id} atualizado com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new PacienteService()