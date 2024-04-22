import express from "express";
import PacienteService from "../services/PacienteService.js";

const router = express.Router()

router.get("/pacientes", function(req, res){
    PacienteService.SelectAll().then((paciente) =>{
        res.render("paciente", {
            paciente : paciente
        })
    })
})

router.get("/pacientes/cpf/:cpf", (req, res) => {
    const pacienteCpf = req.params.cpf;
    PacienteService.SelectByCPF(pacienteCpf).then((paciente) => {
        if (paciente) {
          res.render("pacienteDetalhes", {
            paciente,
        });
        } else {
            res.status(404).send("paciente não encontrada");
        }
    }).catch((error) => {
        console.error("Erro ao buscar paciente por CPF:", error);
        res.status(500).send("Erro interno do servidor");
    });
  });

router.post("/pacientes/novo", (req, res) => {
    PacienteService.Create(
        req.body.nome,
        req.body.cpf,
        req.body.dataNascimento
    )
    res.redirect("/pacientes")
})

router.get("/pacientes/deletar/:id", (req, res) => {
    const id = req.params.id
    PacienteService.Delete(id)
    res.redirect("/pacientes")
})

router.get("/pacientes/editar/:id", (req, res) => {

    const id = req.params.id
    PacienteService.SelectOne(id).then((paciente) => {
        res.render("pacienteEditar", {
            paciente : paciente
        })
    })
})

router.post("/pacientes/atualizar/:id", (req, res) => {
    PacienteService.Update(
        req.body.id,
        req.body.nome,
        req.body.cpf,
        req.body.dataNascimento,
    )
    res.redirect("/pacientes")
})

export default router


