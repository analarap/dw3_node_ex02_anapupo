import express from "express";
import ConsultaService from "../services/ConsultaService.js";
import consulta from "../models/Consulta.js";

const router = express.Router()

router.get("/consultas", function(req, res){
    ConsultaService.SelectAll().then((consulta) =>{
        res.render("consulta", {
            consulta : consulta
        })
    })
})

router.get("/consultas/id/:id", (req, res) => {
  const consultaId = req.params.id;
  ConsultaService.SelectOne(consultaId).then((consulta) => {
      if (consulta) {
        res.render("consultaDetalhes", {
          consulta,
      });
      } else {
          res.status(404).send("Consulta não encontrada");
      }
  }).catch((error) => {
      console.error("Erro ao buscar consulta por ID:", error);
      res.status(500).send("Erro interno do servidor");
  });
});

router.post("/consultas/nova", (req, res) => {
    ConsultaService.Create(
        req.body.paciente,
        req.body.data,
        req.body.horario,
        req.body.especialista,
        req.body.medico
    )
    res.redirect("/consultas")
})

router.get("/consultas/deletar/:id", (req, res) => {
    const id = req.params.id
    ConsultaService.Delete(id)
    res.redirect("/consultas")
})

router.get("/consultas/editar/:id", (req, res) => {
    const id = req.params.id
    ConsultaService.SelectOne(id).then((consulta) => {
        res.render("consultaEditar", {
            consulta : consulta
        })
    })
})

router.post("/consultas/atualizar/:id", (req, res) => {
    ConsultaService.Update(
        req.body.id,
        req.body.paciente,
        req.body.data,
        req.body.horario,
        req.body.especialista,
        req.body.medico
    )
    res.redirect("/consultas")
})

const getRecentConsultas = async (req, res) => {
    try {
      const recentes = await Consulta.find().sort({ data: 1 }).limit(2);
      res.render("index", {
        recentes,
      });
    } catch (error) {
      console.error("Erro ao obter consultas recentes:", error);
      res.status(500).send("Erro ao obter consultas recentes.");
    }
}

  router.get("/consultas/recentes", getRecentConsultas);

router.get("/consultas", (req, res) => {
  ConsultaService.SelectAll().then((consulta) => {
    res.render("consulta", {
      consulta,
    })
  })
})


export default router
