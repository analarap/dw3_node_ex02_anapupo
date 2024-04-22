import mongoose from "mongoose";
import consulta from "../models/Consulta.js";

const Consulta = mongoose.model("Consulta", consulta)

class ConsultaService{
    SelectAll(){
        const consulta = Consulta.find()
        return consulta
    }

    Create(paciente, data, horario, especialista, medico){
        const novaConsulta = new Consulta({
            paciente: paciente,
            data: data,
            horario: horario,
            especialista: especialista,
            medico: medico
        })

        novaConsulta.save()
    }

    SelectOne(id){
        const consulta = Consulta.findOne({_id: id})
        return consulta
    }

    Delete(id){
        Consulta.findByIdAndDelete(id).then(() => {
            console.log(`Consulta com o id ${id} foi deletada`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, paciente, data, horario, especialista, medico){
        Consulta.findByIdAndUpdate(id, { 
            paciente: paciente,
            data: data,
            horario: horario,
            especialista: especialista,
            medico: medico
        }).then(() => {
            console.log(`Consulta com a id: ${id} atualizada com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new ConsultaService()